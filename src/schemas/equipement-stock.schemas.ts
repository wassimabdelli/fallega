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

export type EquipmentStockDocument = EquipmentStock & Document;

@Schema()
export class EquipmentStock {
  @Prop({ required: true })
  quantityTotal: number;

  @Prop({ required: true })
  quantityAvailable: number;

  @Prop({ type: Types.ObjectId, ref: 'EquipmentItem', required: true })
  item: EquipmentItem;
}

export const EquipmentStockSchema = SchemaFactory.createForClass(EquipmentStock);
