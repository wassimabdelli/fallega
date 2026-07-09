import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Call, CallDocument } from 'src/schemas/call.schemas';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';

@Injectable()
export class CallService {
  constructor(
    @InjectModel(Call.name)
    private callModel: Model<CallDocument>,
  ) {}

  async create(createCallDto: CreateCallDto): Promise<CallDocument> {
    const newCall = new this.callModel({
      ...createCallDto,
      status: 'ongoing',
    });
    return newCall.save();
  }

  async findOne(id: string): Promise<Call> {
    const call = await this.callModel
      .findById(id)
      .populate('caller', 'prenom nom email picture')
      .populate('receiver', 'prenom nom email picture')
      .exec();
    
    if (!call) {
      throw new NotFoundException(`Call #${id} not found`);
    }
    return call;
  }

  async updateStatus(
    id: string, 
    status: 'missed' | 'accepted' | 'rejected' | 'ongoing' | 'ended',
    duration?: number,
    endedAt?: Date,
  ): Promise<Call> {
    const updateData: Partial<UpdateCallDto> = { status };
    
    if (duration !== undefined) {
      updateData.duration = duration;
    }
    
    if (endedAt) {
      updateData.endedAt = endedAt;
    }else if (status === 'accepted' || status === 'rejected' || status === 'missed' || status === 'ended') {
      updateData.endedAt = new Date();
    }

    const updatedCall = await this.callModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('caller', 'prenom nom email picture')
      .populate('receiver', 'prenom nom email picture')
      .exec();

    if (!updatedCall) {
      throw new NotFoundException(`Call #${id} not found`);
    }

    return updatedCall;
  }

  async getCallHistory(userId: string): Promise<Call[]> {
    return this.callModel
      .find({
        $or: [
          { caller: new Types.ObjectId(userId) },
          { receiver: new Types.ObjectId(userId) }
        ]
      })
      .populate('caller', 'prenom nom email picture')
      .populate('receiver', 'prenom nom email picture')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getMissedCalls(userId: string): Promise<Call[]> {
    return this.callModel
      .find({
        receiver: new Types.ObjectId(userId),
        status: 'missed'
      })
      .populate('caller', 'prenom nom email picture')
      .populate('receiver', 'prenom nom email picture')
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(id: string, updateCallDto: UpdateCallDto): Promise<Call> {
    const updatedCall = await this.callModel
      .findByIdAndUpdate(id, updateCallDto, { new: true })
      .populate('caller', 'prenom nom email picture')
      .populate('receiver', 'prenom nom email picture')
      .exec();

    if (!updatedCall) {
      throw new NotFoundException(`Call #${id} not found`);
    }

    return updatedCall;
  }
}
