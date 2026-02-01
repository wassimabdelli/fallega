import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schemas';
import { Conversation } from './conversation.schemas';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  sentAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Conversation', required: true })
  conversation: Conversation;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
