import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Reservation } from './reservation.schemas';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  providerRef: string;

  @Prop({ type: Types.ObjectId, ref: 'Reservation', required: true })
  reservation: Reservation;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

export type PaymentProofDocument = PaymentProof & Document;

@Schema({ timestamps: true })
export class PaymentProof {
  @Prop({ required: true })
  fileUrl: string;

  @Prop({ default: Date.now })
  uploadedAt: Date;

  @Prop()
  note: string;

  @Prop({ type: Types.ObjectId, ref: 'Payment', required: true })
  payment: Payment;
}

export const PaymentProofSchema = SchemaFactory.createForClass(PaymentProof);
