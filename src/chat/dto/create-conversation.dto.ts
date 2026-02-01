import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsArray, IsOptional, IsString } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty({ example: ['60d0fe4f5311236168a109ca'], description: 'Liste des IDs des participants' })
  @IsArray()
  @IsMongoId({ each: true })
  participants: string[];

  @ApiProperty({ example: 'Groupe Foot', description: 'Nom de la conversation (optionnel)' })
  @IsString()
  @IsOptional()
  name?: string;
}
