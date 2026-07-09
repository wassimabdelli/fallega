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
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: { origin: '*' }, // ← autorise Flutter à se connecter
  namespace: '/chat',    // ← URL de connexion : ws://ton-ip:3000/chat
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server; // ← l'instance Socket.io pour émettre des events

  // garde en mémoire qui est connecté
  private connectedUsers = new Map<string, string>();
  // Map<userId, socketId>

  constructor(private readonly messageService: MessageService) {}

  // ✅ appelé automatiquement quand un user se connecte
  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedUsers.set(userId, client.id);
      console.log(`User ${userId} connecté`);
    }
  }

  // ✅ appelé automatiquement quand un user se déconnecte
  handleDisconnect(client: Socket) {
    // supprimer l'user de la map
    this.connectedUsers.forEach((socketId, userId) => {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        console.log(`User ${userId} déconnecté`);
      }
    });
  }

  // ✅ écoute l'event 'sendMessage' envoyé par Flutter
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    // 1️⃣ sauvegarder le message dans MongoDB
    const senderId = client.handshake.query.userId as string;
    const savedMessage = await this.messageService.create(createMessageDto, senderId);

    // 2️⃣ envoyer le message au receiver s'il est connecté
    const receiverSocketId = this.connectedUsers.get(
      createMessageDto.receiver,
    );

    if (receiverSocketId) {
      // receiver est en ligne → envoyer en temps réel
      this.server.to(receiverSocketId).emit('newMessage', savedMessage);
    }

    // 3️⃣ confirmer au sender que le message est envoyé
    client.emit('messageSent', savedMessage);

    return savedMessage;
  }

  // ✅ écoute l'event 'markAsRead' envoyé par Flutter
  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
    @MessageBody() data: { messageId: string; senderId: string },
    @ConnectedSocket() client: Socket,
  ) {
    // 1️⃣ marquer comme lu dans MongoDB
    await this.messageService.markAsRead(data.messageId);

    // 2️⃣ notifier le sender que son message est lu (✓✓)
    const senderSocketId = this.connectedUsers.get(data.senderId);
    if (senderSocketId) {
      this.server.to(senderSocketId).emit('messageRead', {
        messageId: data.messageId,
      });
    }
  }

  // ✅ écoute l'event 'typing' — "en train d'écrire..."
  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { receiverId: string; senderId: string },
  ) {
    const receiverSocketId = this.connectedUsers.get(data.receiverId);
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('userTyping', {
        senderId: data.senderId,
      });
    }
  }
}