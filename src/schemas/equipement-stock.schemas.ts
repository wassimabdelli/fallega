import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EquipmentItemDocument = EquipmentItem & Document;

@Schema()
export class EquipmentItem {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const EquipmentItemSchema = SchemaFactory.createForClass(EquipmentItem);

export type EquipmentRentalDocument = EquipmentRental & Document;

@Schema()
export class EquipmentRental {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, min: 0 })
  dailyPrice: number;

  @Prop({ required: true, min: 0 })
  quantityTotal: number;

  @Prop({ required: true, min: 0 })
  quantityAvailable: number;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  imageUrl?: string;

  @Prop()
  specifications?: string;

  @Prop({ type: Types.ObjectId, ref: 'EquipmentItem', required: true })
  category: EquipmentItem;
}

export const EquipmentRentalSchema = SchemaFactory.createForClass(EquipmentRental);
