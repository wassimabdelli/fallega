import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EquipmentItem,
  EquipmentItemDocument,
  EquipmentRental,
  EquipmentRentalDocument,
} from 'src/schemas/equipement-stock.schemas';
import { CreateEquipmentItemDto } from './dto/create-equipment-item.dto';
import { UpdateEquipmentItemDto } from './dto/update-equipment-item.dto';
import { SearchEquipmentItemDto } from './dto/search-equipment-item.dto';
import { CreateEquipmentRentalDto } from './dto/create-equipment-rental.dto';
import { UpdateEquipmentRentalDto } from './dto/update-equipment-rental.dto';
import { SearchEquipmentRentalDto } from './dto/search-equipment-rental.dto';

@Injectable()
export class EquipementStockService {
  constructor(
    @InjectModel(EquipmentItem.name)
    private itemModel: Model<EquipmentItemDocument>,
    @InjectModel(EquipmentRental.name)
    private rentalModel: Model<EquipmentRentalDocument>,
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

  async updateItem(id: string, dto: UpdateEquipmentItemDto): Promise<EquipmentItem> {
    const updatedItem = await this.itemModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updatedItem) throw new NotFoundException(`Item #${id} not found`);
    return updatedItem;
  }

  async removeItem(id: string): Promise<void> {
    const result = await this.itemModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Item #${id} not found`);
  }

  async searchItems(searchDto: SearchEquipmentItemDto): Promise<{ items: EquipmentItem[], total: number, page: number, limit: number }> {
    const { page = 1, limit = 10, name, description } = searchDto;
    const skip = (page - 1) * limit;
    
    const filter: any = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    if (description) {
      filter.description = { $regex: description, $options: 'i' };
    }

    const items = await this.itemModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.itemModel.countDocuments(filter).exec();

    return {
      items,
      total,
      page,
      limit,
    };
  }

  // --- Equipment Rentals ---
  async createRental(dto: CreateEquipmentRentalDto): Promise<EquipmentRental> {
    const newRental = new this.rentalModel(dto);
    return newRental.save();
  }

  async findAllRentals(): Promise<EquipmentRental[]> {
    return this.rentalModel.find().populate('category').exec();
  }

  async findOneRental(id: string): Promise<EquipmentRental> {
    const rental = await this.rentalModel.findById(id).populate('category').exec();
    if (!rental) throw new NotFoundException(`Rental #${id} not found`);
    return rental;
  }

  async updateRental(id: string, dto: UpdateEquipmentRentalDto): Promise<EquipmentRental> {
    const updatedRental = await this.rentalModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('category')
      .exec();
    if (!updatedRental) throw new NotFoundException(`Rental #${id} not found`);
    return updatedRental;
  }

  async removeRental(id: string): Promise<void> {
    const result = await this.rentalModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Rental #${id} not found`);
  }

  async searchRentals(searchDto: SearchEquipmentRentalDto): Promise<{ rentals: EquipmentRental[], total: number, page: number, limit: number }> {
    const { 
      page = 1, 
      limit = 10, 
      name,
      description,
      category,
      minDailyPrice,
      maxDailyPrice,
      minQuantityAvailable,
      maxQuantityAvailable,
      isAvailable,
      isActive,
      outOfStock,
      sortBy = 'name',
      sortOrder = 'asc'
    } = searchDto;
    
    const skip = (page - 1) * limit;
    
    const filter: any = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    if (description) {
      filter.description = { $regex: description, $options: 'i' };
    }
    if (category) {
      filter.category = category;
    }
    if (minDailyPrice !== undefined || maxDailyPrice !== undefined) {
      filter.dailyPrice = {};
      if (minDailyPrice !== undefined) {
        filter.dailyPrice.$gte = minDailyPrice;
      }
      if (maxDailyPrice !== undefined) {
        filter.dailyPrice.$lte = maxDailyPrice;
      }
    }
    if (minQuantityAvailable !== undefined || maxQuantityAvailable !== undefined) {
      filter.quantityAvailable = {};
      if (minQuantityAvailable !== undefined) {
        filter.quantityAvailable.$gte = minQuantityAvailable;
      }
      if (maxQuantityAvailable !== undefined) {
        filter.quantityAvailable.$lte = maxQuantityAvailable;
      }
    }
    if (isAvailable !== undefined) {
      filter.isAvailable = isAvailable;
    }
    if (isActive !== undefined) {
      filter.isActive = isActive;
    }
    if (outOfStock === true) {
      filter.quantityAvailable = 0;
    }

    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const rentals = await this.rentalModel
      .find(filter)
      .populate('category')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.rentalModel.countDocuments(filter).exec();

    return {
      rentals,
      total,
      page,
      limit,
    };
  }

  async updateRentalQuantity(id: string, quantityChange: number): Promise<EquipmentRental> {
    const rental = await this.rentalModel.findById(id).exec();
    if (!rental) throw new NotFoundException(`Rental #${id} not found`);
    
    const newQuantityAvailable = rental.quantityAvailable + quantityChange;
    if (newQuantityAvailable < 0) {
      throw new Error('Quantité disponible ne peut pas être négative');
    }
    if (newQuantityAvailable > rental.quantityTotal) {
      throw new Error('Quantité disponible ne peut pas dépasser la quantité totale');
    }
    
    rental.quantityAvailable = newQuantityAvailable;
    rental.isAvailable = newQuantityAvailable > 0;
    return rental.save();
  }
}
