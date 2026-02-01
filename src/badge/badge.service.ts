import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Badge, BadgeDocument } from 'src/schemas/badge.schemas';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';

@Injectable()
export class BadgeService {
  constructor(@InjectModel(Badge.name) private badgeModel: Model<BadgeDocument>) {}

  async create(createBadgeDto: CreateBadgeDto): Promise<Badge> {
    const newBadge = new this.badgeModel(createBadgeDto);
    return newBadge.save();
  }

  async findAll(): Promise<Badge[]> {
    return this.badgeModel.find().populate('user').exec();
  }

  async findOne(id: string): Promise<Badge> {
    const badge = await this.badgeModel.findById(id).populate('user').exec();
    if (!badge) throw new NotFoundException(`Badge #${id} not found`);
    return badge;
  }

  async update(id: string, updateBadgeDto: UpdateBadgeDto): Promise<Badge> {
    const updated = await this.badgeModel
      .findByIdAndUpdate(id, updateBadgeDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Badge #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<Badge> {
    const deleted = await this.badgeModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Badge #${id} not found`);
    return deleted;
  }
}
