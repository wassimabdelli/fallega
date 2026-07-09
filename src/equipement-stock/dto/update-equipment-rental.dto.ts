import { PartialType } from '@nestjs/swagger';
import { CreateEquipmentRentalDto } from './create-equipment-rental.dto';

export class UpdateEquipmentRentalDto extends PartialType(CreateEquipmentRentalDto) {}
