import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class SearchEquipmentItemDto {
  @ApiProperty({ example: 'Ballon', description: 'Rechercher par nom', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Football', description: 'Rechercher par description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '1', description: 'Numéro de page', required: false })
  @IsOptional()
  page?: number;

  @ApiProperty({ example: '10', description: 'Nombre d\'éléments par page', required: false })
  @IsOptional()
  limit?: number;
}
