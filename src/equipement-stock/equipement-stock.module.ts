import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EquipementStockService } from './equipement-stock.service';
import { EquipementStockController } from './equipement-stock.controller';
import {
  EquipmentItem,
  EquipmentItemSchema,
  EquipmentRental,
  EquipmentRentalSchema,
} from 'src/schemas/equipement-stock.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EquipmentItem.name, schema: EquipmentItemSchema },
      { name: EquipmentRental.name, schema: EquipmentRentalSchema },
    ]),
  ],
  controllers: [EquipementStockController],
  providers: [EquipementStockService],
  exports: [EquipementStockService],
})
export class EquipementStockModule {}
