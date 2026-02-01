import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BadgeDocument = Badge & Document;

@Schema()
export class Badge {
  @Prop({ required: true })
  name: string;

  @Prop()
  iconUrl: string;
}

export const BadgeSchema = SchemaFactory.createForClass(Badge);
