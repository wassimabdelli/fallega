import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsMongoId, Min } from 'class-validator';

export class CreateEquipementStockDto {
  @ApiProperty({ example: 50, description: 'Quantité totale' })
  @IsNumber()
  @Min(0)
  quantityTotal: number;

  @ApiProperty({ example: 50, description: 'Quantité disponible' })
  @IsNumber()
  @Min(0)
  quantityAvailable: number;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'ID de l’équipement (Item)' })
  @IsMongoId()
  item: string;
}
