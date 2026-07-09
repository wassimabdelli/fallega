import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsMongoId, Min, Max } from 'class-validator';

export class SearchEquipementStockDto {
  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'Filtrer par ID d\'équipement', required: false })
  @IsMongoId()
  @IsOptional()
  item?: string;

  @ApiProperty({ example: '10', description: 'Quantité disponible minimale', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  minQuantityAvailable?: number;

  @ApiProperty({ example: '100', description: 'Quantité disponible maximale', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxQuantityAvailable?: number;

  @ApiProperty({ example: '10', description: 'Quantité totale minimale', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  minQuantityTotal?: number;

  @ApiProperty({ example: '100', description: 'Quantité totale maximale', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxQuantityTotal?: number;

  @ApiProperty({ example: 'true', description: 'Filtrer les stocks en rupture (quantité disponible = 0)', required: false })
  @IsOptional()
  outOfStock?: boolean;

  @ApiProperty({ example: '1', description: 'Numéro de page', required: false })
  @IsOptional()
  page?: number;

  @ApiProperty({ example: '10', description: 'Nombre d\'éléments par page', required: false })
  @IsOptional()
  limit?: number;

  @ApiProperty({ example: 'name', description: 'Champ de tri', required: false })
  @IsString()
  @IsOptional()
  sortBy?: string;

  @ApiProperty({ example: 'asc', description: 'Ordre de tri (asc/desc)', required: false })
  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}
