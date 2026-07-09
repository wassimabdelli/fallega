import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInvitationDto {
  @ApiProperty({ example: '60d0fe4f5311236168a109cb', description: 'Destinataire (User ID)' })
  @IsMongoId()
  @IsNotEmpty()
  receiver: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109cc', description: 'Événement (Event ID) - optionnel pour les invitations d\'amitié' })
  @IsMongoId()
  @IsOptional()
  event?: string;
}
