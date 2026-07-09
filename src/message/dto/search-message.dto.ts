import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class SearchMessageDto {
  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'Filtrer par ID de l\'expéditeur', required: false })
  @IsMongoId()
  @IsOptional()
  sender?: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109cb', description: 'Filtrer par ID du destinataire', required: false })
  @IsMongoId()
  @IsOptional()
  receiver?: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'Filtrer par conversation (utilisateur courant)', required: false })
  @IsMongoId()
  @IsOptional()
  userId?: string;

  @ApiProperty({ example: 'Bonjour', description: 'Rechercher par contenu', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 'text', description: 'Filtrer par type de message', enum: ['text', 'image', 'file'], required: false })
  @IsOptional()
  messageType?: 'text' | 'image' | 'file';

  @ApiProperty({ example: false, description: 'Filtrer les messages non lus', required: false })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @ApiProperty({ example: false, description: 'Filtrer les messages non supprimés', required: false })
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @ApiProperty({ example: '2023-01-01', description: 'Filtrer les messages après cette date', required: false })
  @IsString()
  @IsOptional()
  dateFrom?: string;

  @ApiProperty({ example: '2023-12-31', description: 'Filtrer les messages avant cette date', required: false })
  @IsString()
  @IsOptional()
  dateTo?: string;

  @ApiProperty({ example: '1', description: 'Numéro de page', required: false })
  @IsOptional()
  page?: number;

  @ApiProperty({ example: '20', description: 'Nombre d\'éléments par page', required: false })
  @IsOptional()
  limit?: number;

  @ApiProperty({ example: 'createdAt', description: 'Champ de tri', required: false })
  @IsString()
  @IsOptional()
  sortBy?: string;

  @ApiProperty({ example: 'desc', description: 'Ordre de tri (asc/desc)', required: false })
  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}
