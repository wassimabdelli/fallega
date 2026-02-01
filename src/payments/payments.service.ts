import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Payment,
  PaymentDocument,
  PaymentProof,
  PaymentProofDocument,
} from 'src/schemas/payment.schemas';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePaymentProofDto } from './dto/create-payment-proof.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(PaymentProof.name) private proofModel: Model<PaymentProofDocument>,
  ) {}

  // --- Payments ---
  async createPayment(dto: CreatePaymentDto): Promise<Payment> {
    const newPayment = new this.paymentModel(dto);
    return newPayment.save();
  }

  async findAllPayments(): Promise<Payment[]> {
    return this.paymentModel.find().populate('reservation').exec();
  }

  async findOnePayment(id: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(id).populate('reservation').exec();
    if (!payment) throw new NotFoundException(`Payment #${id} not found`);
    return payment;
  }

  // --- Proofs ---
  async createProof(dto: CreatePaymentProofDto): Promise<PaymentProof> {
    const newProof = new this.proofModel(dto);
    return newProof.save();
  }

  async findAllProofs(): Promise<PaymentProof[]> {
    return this.proofModel.find().populate('payment').exec();
  }
}
