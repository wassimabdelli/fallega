import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EquipmentItem,
  EquipmentItemDocument,
  EquipmentStock,
  EquipmentStockDocument,
} from 'src/schemas/equipement-stock.schemas';
import { CreateEquipmentItemDto } from './dto/create-equipment-item.dto';
import { CreateEquipementStockDto } from './dto/create-equipement-stock.dto';

@Injectable()
export class EquipementStockService {
  constructor(
    @InjectModel(EquipmentItem.name)
    private itemModel: Model<EquipmentItemDocument>,
    @InjectModel(EquipmentStock.name)
    private stockModel: Model<EquipmentStockDocument>,
  ) {}

  // --- Items ---
  async createItem(dto: CreateEquipmentItemDto): Promise<EquipmentItem> {
    const newItem = new this.itemModel(dto);
    return newItem.save();
  }

  async findAllItems(): Promise<EquipmentItem[]> {
    return this.itemModel.find().exec();
  }

  async findOneItem(id: string): Promise<EquipmentItem> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) throw new NotFoundException(`Item #${id} not found`);
    return item;
  }

  // --- Stocks ---
  async createStock(dto: CreateEquipementStockDto): Promise<EquipmentStock> {
    const newStock = new this.stockModel(dto);
    return newStock.save();
  }

  async findAllStocks(): Promise<EquipmentStock[]> {
    return this.stockModel.find().populate('item').exec();
  }

  async findOneStock(id: string): Promise<EquipmentStock> {
    const stock = await this.stockModel.findById(id).populate('item').exec();
    if (!stock) throw new NotFoundException(`Stock #${id} not found`);
    return stock;
  }
}
