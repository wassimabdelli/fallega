import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsOptional, IsDateString } from 'class-validator';

export class CreateInvitationDto {
  @ApiProperty({ example: 'PENDING', description: 'Statut de l’invitation' })
  @IsString()
  status: string;

  @ApiProperty({ example: '2023-10-01T10:00:00Z', description: 'Date d’envoi' })
  @IsDateString()
  @IsOptional()
  sentAt?: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'Expéditeur (User ID)' })
  @IsMongoId()
  sender: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109cb', description: 'Destinataire (User ID)' })
  @IsMongoId()
  receiver: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109cc', description: 'Événement (Event ID)' })
  @IsMongoId()
  event: string;
}
