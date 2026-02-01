import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EquipementStockService } from './equipement-stock.service';
import { EquipementStockController } from './equipement-stock.controller';
import {
  EquipmentItem,
  EquipmentItemSchema,
  EquipmentStock,
  EquipmentStockSchema,
} from 'src/schemas/equipement-stock.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EquipmentItem.name, schema: EquipmentItemSchema },
      { name: EquipmentStock.name, schema: EquipmentStockSchema },
    ]),
  ],
  controllers: [EquipementStockController],
  providers: [EquipementStockService],
  exports: [EquipementStockService],
})
export class EquipementStockModule {}
