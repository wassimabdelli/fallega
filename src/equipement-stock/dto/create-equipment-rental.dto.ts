import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsMongoId, IsOptional, Min, IsBoolean } from 'class-validator';

export class CreateEquipmentRentalDto {
  @ApiProperty({ example: 'Ballon de Football Pro', description: 'Nom du produit de location' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Ballon professionnel de haute qualité', description: 'Description du produit', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 15.50, description: 'Prix journalier en euros' })
  @IsNumber()
  @Min(0)
  dailyPrice: number;

  @ApiProperty({ example: 10, description: 'Quantité totale disponible' })
  @IsNumber()
  @Min(0)
  quantityTotal: number;

  @ApiProperty({ example: 10, description: 'Quantité actuellement disponible' })
  @IsNumber()
  @Min(0)
  quantityAvailable: number;

  @ApiProperty({ example: true, description: 'Le produit est-il disponible à la location', required: false })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty({ example: true, description: 'Le produit est-il actif dans le catalogue', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL de l\'image', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: 'Taille 5, cuir synthétique', description: 'Spécifications techniques', required: false })
  @IsString()
  @IsOptional()
  specifications?: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'ID de la catégorie (EquipmentItem)' })
  @IsMongoId()
  category: string;
}
