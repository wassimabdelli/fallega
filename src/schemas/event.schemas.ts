import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const EventSchema = SchemaFactory.createForClass(Event);
