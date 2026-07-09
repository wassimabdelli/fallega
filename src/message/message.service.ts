import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schemas';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { SearchMessageDto } from './dto/search-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto, senderId: string): Promise<Message> {
    const newMessage = new this.messageModel({
      ...createMessageDto,
      sender: senderId,
    });
    return newMessage.save();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel
      .find({ isDeleted: false })
      .populate('sender', 'prenom nom email')
      .populate('receiver', 'prenom nom email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messageModel
      .findById(id)
      .populate('sender', 'prenom nom email')
      .populate('receiver', 'prenom nom email')
      .exec();
    if (!message) throw new NotFoundException(`Message #${id} not found`);
    return message;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const updatedMessage = await this.messageModel
      .findByIdAndUpdate(id, updateMessageDto, { new: true })
      .populate('sender', 'prenom nom email')
      .populate('receiver', 'prenom nom email')
      .exec();
    if (!updatedMessage) throw new NotFoundException(`Message #${id} not found`);
    return updatedMessage;
  }

  async remove(id: string): Promise<void> {
    const result = await this.messageModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Message #${id} not found`);
  }

  async softDelete(id: string): Promise<Message> {
    const message = await this.messageModel
      .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .exec();
    if (!message) throw new NotFoundException(`Message #${id} not found`);
    return message;
  }

  async markAsRead(id: string): Promise<Message> {
    const message = await this.messageModel
      .findByIdAndUpdate(id, { isRead: true }, { new: true })
      .populate('sender', 'prenom nom email')
      .populate('receiver', 'prenom nom email')
      .exec();
    if (!message) throw new NotFoundException(`Message #${id} not found`);
    return message;
  }

  async searchMessages(searchDto: SearchMessageDto): Promise<{ messages: Message[], total: number, page: number, limit: number }> {
    const { 
      page = 1, 
      limit = 20, 
      sender,
      receiver,
      userId,
      content,
      messageType,
      isRead,
      isDeleted = false,
      dateFrom,
      dateTo,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = searchDto;
    
    const skip = (page - 1) * limit;
    
    const filter: any = { isDeleted };
    
    // Filtrer par utilisateur (conversation)
    if (userId) {
      filter.$or = [
        { sender: userId },
        { receiver: userId }
      ];
    } else {
      // Filtrage individuel
      if (sender) filter.sender = sender;
      if (receiver) filter.receiver = receiver;
    }
    
    if (content) {
      filter.content = { $regex: content, $options: 'i' };
    }
    
    if (messageType) {
      filter.messageType = messageType;
    }
    
    if (isRead !== undefined) {
      filter.isRead = isRead;
    }
    
    // Filtrage par date
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) {
        filter.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        filter.createdAt.$lte = new Date(dateTo);
      }
    }

    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const messages = await this.messageModel
      .find(filter)
      .populate('sender', 'prenom nom email')
      .populate('receiver', 'prenom nom email')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.messageModel.countDocuments(filter).exec();

    return {
      messages,
      total,
      page,
      limit,
    };
  }

  async getConversation(userId1: string, userId2: string, page = 1, limit = 20): Promise<{ messages: Message[], total: number, page: number, limit: number }> {
    const skip = (page - 1) * limit;
    
    const filter = {
      isDeleted: false,
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 }
      ]
    };

    const messages = await this.messageModel
      .find(filter)
      .populate('sender', 'prenom nom email')
      .populate('receiver', 'prenom nom email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.messageModel.countDocuments(filter).exec();

    return {
      messages,
      total,
      page,
      limit,
    };
  }

  async getUnreadMessages(userId: string): Promise<Message[]> {
    return this.messageModel
      .find({ receiver: userId, isRead: false, isDeleted: false })
      .populate('sender', 'prenom nom email')
      .populate('receiver', 'prenom nom email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async markAllAsRead(userId: string, senderId?: string): Promise<{ modifiedCount: number }> {
    const filter: any = { receiver: userId, isRead: false, isDeleted: false };
    if (senderId) {
      filter.sender = senderId;
    }
    
    const result = await this.messageModel
      .updateMany(filter, { isRead: true })
      .exec();
    
    return { modifiedCount: result.modifiedCount };
  }

  async deleteConversation(userId1: string, userId2: string): Promise<{ deletedCount: number }> {
    const result = await this.messageModel
      .updateMany(
        {
          isDeleted: false,
          $or: [
            { sender: userId1, receiver: userId2 },
            { sender: userId2, receiver: userId1 }
          ]
        },
        { isDeleted: true }
      )
      .exec();
    
    return { deletedCount: result.modifiedCount };
  }
}
