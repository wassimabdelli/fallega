import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsBoolean, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ example: 'Nouvelle réservation', description: 'Titre' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Votre réservation a été confirmée.', description: 'Message' })
  @IsString()
  message: string;

  @ApiProperty({ example: 'INFO', description: 'Type de notification' })
  @IsString()
  type: string;

  @ApiProperty({ example: false, description: 'Lu ou non' })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'Destinataire (User ID)' })
  @IsMongoId()
  user: string;
}
