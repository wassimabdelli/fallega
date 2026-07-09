import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateEquipmentItemDto {
  @ApiProperty({ example: 'Ballon de Football', description: 'Nom de l\'équipement', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Ballon officiel taille 5', description: 'Description', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
