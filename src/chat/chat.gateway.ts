import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/group-chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>();
  private userConversations = new Map<string, Set<string>>();
  // Map<userId, Set<conversationId>>

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedUsers.set(userId, client.id);
      this.userConversations.set(userId, new Set());
      console.log(`User ${userId} connecté au chat de groupe`);
    }
  }

  handleDisconnect(client: Socket) {
    this.connectedUsers.forEach((socketId, userId) => {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        this.userConversations.delete(userId);
        console.log(`User ${userId} déconnecté du chat de groupe`);
      }
    });
  }

  @SubscribeMessage('joinConversation')
  async handleJoinConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.handshake.query.userId as string;
    if (!userId) return;

    // Vérifier que l'utilisateur est participant de la conversation
    const conversation = await this.chatService.findOneConversation(data.conversationId);
    if (!conversation.participants.includes(userId as any)) {
      client.emit('error', { message: 'Vous n êtes pas participant de cette conversation' });
      return;
    }

    // Rejoindre la room Socket.io pour cette conversation
    client.join(data.conversationId);
    
    // Suivre les conversations de l'utilisateur
    const userConvs = this.userConversations.get(userId) || new Set();
    userConvs.add(data.conversationId);
    this.userConversations.set(userId, userConvs);

    console.log(`User ${userId} a rejoint la conversation ${data.conversationId}`);
    client.emit('joinedConversation', { conversationId: data.conversationId });
  }

  @SubscribeMessage('leaveConversation')
  handleLeaveConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.handshake.query.userId as string;
    if (!userId) return;

    client.leave(data.conversationId);
    
    const userConvs = this.userConversations.get(userId);
    if (userConvs) {
      userConvs.delete(data.conversationId);
    }

    console.log(`User ${userId} a quitté la conversation ${data.conversationId}`);
    client.emit('leftConversation', { conversationId: data.conversationId });
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.handshake.query.userId as string;
    
    // Vérifier que l'utilisateur est dans la conversation
    const userConvs = this.userConversations.get(userId);
    if (!userConvs || !userConvs.has(createMessageDto.conversation)) {
      client.emit('error', { message: 'Vous n avez pas rejoint cette conversation' });
      return;
    }

    // Sauvegarder le message
    const savedMessage = await this.chatService.createMessage({
      ...createMessageDto,
      sender: userId,
    });

    // Envoyer le message à tous les participants de la conversation
    this.server.to(createMessageDto.conversation).emit('newMessage', savedMessage);

    // Confirmer à l'expéditeur
    client.emit('messageSent', savedMessage);

    return savedMessage;
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { conversationId: string; senderId: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Notifier tous les participants de la conversation sauf l'expéditeur
    client.to(data.conversationId).emit('userTyping', {
      senderId: data.senderId,
      conversationId: data.conversationId,
    });
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(
    @MessageBody() data: { conversationId: string; senderId: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Notifier tous les participants de la conversation sauf l'expéditeur
    client.to(data.conversationId).emit('userStopTyping', {
      senderId: data.senderId,
      conversationId: data.conversationId,
    });
  }
}
