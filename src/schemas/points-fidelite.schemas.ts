import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schemas';

export type PointsTransactionDocument = PointsTransaction & Document;

@Schema({ timestamps: true })
export class PointsTransaction {
  @Prop({ required: true })
  points: number;

  @Prop({ required: true })
  reason: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const PointsTransactionSchema = SchemaFactory.createForClass(PointsTransaction);
