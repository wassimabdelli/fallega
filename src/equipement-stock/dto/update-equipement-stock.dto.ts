import { PartialType } from '@nestjs/swagger';
import { CreateEquipementStockDto } from './create-equipement-stock.dto';

export class UpdateEquipementStockDto extends PartialType(CreateEquipementStockDto) {}
