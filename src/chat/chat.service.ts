import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Conversation,
  ConversationDocument,
} from 'src/schemas/conversation.schemas';
import { Message, MessageDocument } from 'src/schemas/message.schemas';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  // --- Conversations ---
  async createConversation(
    dto: CreateConversationDto,
  ): Promise<Conversation> {
    const newConv = new this.conversationModel(dto);
    return newConv.save();
  }

  async findAllConversations(): Promise<Conversation[]> {
    return this.conversationModel.find().populate('participants').exec();
  }

  async findOneConversation(id: string): Promise<Conversation> {
    const conv = await this.conversationModel
      .findById(id)
      .populate('participants')
      .exec();
    if (!conv) throw new NotFoundException(`Conversation #${id} not found`);
    return conv;
  }

  // --- Messages ---
  async createMessage(dto: CreateMessageDto): Promise<Message> {
    const newMsg = new this.messageModel(dto);
    // Optionally update lastMessageAt in conversation
    await this.conversationModel.findByIdAndUpdate(dto.conversation, {
      lastMessageAt: new Date(),
    });
    return newMsg.save();
  }

  async findMessagesByConversation(conversationId: string): Promise<Message[]> {
    return this.messageModel
      .find({ conversation: conversationId as any })
      .populate('sender')
      .sort({ createdAt: 1 })
      .exec();
  }
}
