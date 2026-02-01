import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schemas';
import { Event } from './event.schemas';

export type InvitationDocument = Invitation & Document;

@Schema({ timestamps: true })
export class Invitation {
  @Prop({ required: true })
  status: string;

  @Prop({ default: Date.now })
  sentAt: Date;

  @Prop()
  respondedAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: User;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  receiver: User;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  event: Event;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
