import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schemas';
import { Event } from './event.schemas';

export type ReservationDocument = Reservation & Document;

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  event: Event;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
