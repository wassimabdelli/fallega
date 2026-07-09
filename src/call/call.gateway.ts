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
import { CallService } from './call.service';
import { CallDocument } from 'src/schemas/call.schemas';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/call',
})
export class CallGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>();
  // Map<userId, socketId>

  constructor(private readonly callService: CallService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedUsers.set(userId, client.id);
      console.log(`User ${userId} connecté au service d'appel`);
    }
  }

  handleDisconnect(client: Socket) {
    this.connectedUsers.forEach((socketId, userId) => {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        console.log(`User ${userId} déconnecté du service d'appel`);
      }
    });
  }

  @SubscribeMessage('initiateCall')
  async handleInitiateCall(
    @MessageBody() data: { receiverId: string; callType: 'audio' | 'video'; callerName?: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const callerId = client.handshake.query.userId as string;
      const newCall = await this.callService.create({
        caller: callerId,
        receiver: data.receiverId,
        callType: data.callType,
      });
      const populatedCall = (await this.callService.findOne(newCall._id.toString())) as any;
      const providedCallerName = data.callerName?.trim() ?? '';
      const callerName =
        providedCallerName.length > 0
          ? providedCallerName
          : `${populatedCall.caller?.prenom ?? ''} ${populatedCall.caller?.nom ?? ''}`.trim();

      // Send the callId back to the caller FIRST!
      client.emit('callCreated', { callId: newCall._id.toString() });

      const receiverSocketId = this.connectedUsers.get(data.receiverId);
      
      if (receiverSocketId) {
        this.server.to(receiverSocketId).emit('incomingCall', {
          callId: newCall._id.toString(),
          callerId: callerId,
          callerName: callerName.length > 0 ? callerName : 'Appel entrant',
          callType: data.callType,
          type: data.callType,
        });
      } else {
        await this.callService.updateStatus(newCall._id.toString(), 'missed');
        client.emit('callMissed', {
          callId: newCall._id.toString(),
          receiverId: data.receiverId,
        });
      }

      return newCall;
    } catch (error) {
      client.emit('error', { message: 'Failed to initiate call', error: error.message });
    }
  }

  @SubscribeMessage('answerCall')
  async handleAnswerCall(
    @MessageBody() data: { callId: string; callerId: string; accepted: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const callerSocketId = this.connectedUsers.get(data.callerId);
      
      if (data.accepted) {
        await this.callService.updateStatus(data.callId, 'accepted');
        
        if (callerSocketId) {
          this.server.to(callerSocketId).emit('callAnswered', {
            callId: data.callId,
            accepted: true,
          });
        }
      } else {
        await this.callService.updateStatus(data.callId, 'rejected');
        
        if (callerSocketId) {
          this.server.to(callerSocketId).emit('callRejected', {
            callId: data.callId,
            accepted: false,
          });
        }
      }
    } catch (error) {
      client.emit('error', { message: 'Failed to answer call', error: error.message });
    }
  }

  @SubscribeMessage('iceCandidate')
  handleIceCandidate(
    @MessageBody() data: { callId: string; targetUserId: string; candidate: any },
    @ConnectedSocket() client: Socket,
  ) {
    const targetSocketId = this.connectedUsers.get(data.targetUserId);
    if (targetSocketId) {
      this.server.to(targetSocketId).emit('iceCandidate', {
        callId: data.callId,
        candidate: data.candidate,
      });
    }
  }

  @SubscribeMessage('offer')
  handleOffer(
    @MessageBody() data: { callId: string; targetUserId: string; offer: any },
    @ConnectedSocket() client: Socket,
  ) {
    const targetSocketId = this.connectedUsers.get(data.targetUserId);
    if (targetSocketId) {
      this.server.to(targetSocketId).emit('offer', {
        callId: data.callId,
        offer: data.offer,
      });
    }
  }

  @SubscribeMessage('answer')
  handleAnswer(
    @MessageBody() data: { callId: string; targetUserId: string; answer: any },
    @ConnectedSocket() client: Socket,
  ) {
    const targetSocketId = this.connectedUsers.get(data.targetUserId);
    if (targetSocketId) {
      this.server.to(targetSocketId).emit('answer', {
        callId: data.callId,
        answer: data.answer,
      });
    }
  }

  @SubscribeMessage('endCall')
  async handleEndCall(
    @MessageBody() data: { callId: string; userId: string; duration: number },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // Mettre à jour le statut de l'appel
      await this.callService.updateStatus(
        data.callId, 
        'ended', 
        data.duration, 
        new Date()
      );

      // Récupérer les détails de l'appel pour notifier l'autre participant
      const call = await this.callService.findOne(data.callId);
      
      // Déterminer l'autre participant
      const callDoc = call as any;
      const otherUserId = callDoc.caller._id.toString() === data.userId 
        ? callDoc.receiver._id.toString() 
        : callDoc.caller._id.toString();

      const otherUserSocketId = this.connectedUsers.get(otherUserId);
      
      if (otherUserSocketId) {
        this.server.to(otherUserSocketId).emit('callEnded', {
          callId: data.callId,
          duration: data.duration,
          endedBy: data.userId,
        });
      }

      client.emit('callEnded', {
        callId: data.callId,
        duration: data.duration,
        endedBy: data.userId,
      });

    } catch (error) {
      client.emit('error', { message: 'Failed to end call', error: error.message });
    }
  }
}
