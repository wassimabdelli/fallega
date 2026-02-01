import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schemas';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ default: false })
  isGroup: boolean;

  @Prop()
  title: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  participants: User[];

  @Prop()
  lastMessageAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
