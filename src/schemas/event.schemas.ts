import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  coverImage: string;

  @Prop()
  locationName: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop({ required: true })
  basePrice: number;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  eventDate: Date;

  @Prop({ type: [Types.ObjectId], default: [] })
  participants: Types.ObjectId[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
