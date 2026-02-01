import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PointsTransaction, PointsTransactionDocument } from 'src/schemas/points-fidelite.schemas';
import { CreatePointsFideliteDto } from './dto/create-points-fidelite.dto';
import { UpdatePointsFideliteDto } from './dto/update-points-fidelite.dto';

@Injectable()
export class PointsFideliteService {
  constructor(
    @InjectModel(PointsTransaction.name)
    private pointsModel: Model<PointsTransactionDocument>,
  ) {}

  async create(createPointsFideliteDto: CreatePointsFideliteDto): Promise<PointsTransaction> {
    const newTx = new this.pointsModel(createPointsFideliteDto);
    return newTx.save();
  }

  async findAll(): Promise<PointsTransaction[]> {
    return this.pointsModel.find().populate('user').sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<PointsTransaction> {
    const tx = await this.pointsModel.findById(id).populate('user').exec();
    if (!tx) throw new NotFoundException(`Transaction #${id} not found`);
    return tx;
  }
}
