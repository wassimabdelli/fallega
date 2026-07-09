import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ type: [Types.ObjectId], ref: 'User', required: true })
  participants: Types.ObjectId[];

  @Prop({ type: String, required: false })
  name?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  admin?: Types.ObjectId;

  @Prop({ type: String, enum: ['private', 'group'], default: 'private' })
  type: 'private' | 'group';

  @Prop({ type: Date, required: false })
  lastMessageAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Message', required: false })
  lastMessage?: Types.ObjectId;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
