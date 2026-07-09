import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsMongoId, Min, Max, IsBoolean } from 'class-validator';

export class SearchEquipmentRentalDto {
  @ApiProperty({ example: 'Ballon', description: 'Rechercher par nom', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Football', description: 'Rechercher par description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'Filtrer par catégorie', required: false })
  @IsMongoId()
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 10, description: 'Prix journalier minimum', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  minDailyPrice?: number;

  @ApiProperty({ example: 100, description: 'Prix journalier maximum', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxDailyPrice?: number;

  @ApiProperty({ example: 5, description: 'Quantité disponible minimale', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  minQuantityAvailable?: number;

  @ApiProperty({ example: 50, description: 'Quantité disponible maximale', required: false })
  @IsNumber()
  @IsOptional()
  @Min(0)
  maxQuantityAvailable?: number;

  @ApiProperty({ example: true, description: 'Filtrer les produits disponibles', required: false })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty({ example: true, description: 'Filtrer les produits actifs', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: true, description: 'Filtrer les produits en rupture de stock', required: false })
  @IsBoolean()
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
