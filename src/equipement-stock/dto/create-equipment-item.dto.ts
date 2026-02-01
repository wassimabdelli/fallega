import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateEquipmentItemDto {
  @ApiProperty({ example: 'Ballon de Football', description: 'Nom de l’équipement' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Ballon officiel taille 5', description: 'Description' })
  @IsString()
  @IsOptional()
  description?: string;
}
