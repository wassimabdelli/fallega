import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsMongoId, IsString, IsOptional } from 'class-validator';

export class CreatePointsFideliteDto {
  @ApiProperty({ example: 10, description: 'Points gagnés (positif) ou dépensés (négatif)' })
  @IsNumber()
  points: number;

  @ApiProperty({ example: 'EARN', description: 'Type de transaction (EARN, SPEND)' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'Réservation #123', description: 'Description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'ID de l’utilisateur' })
  @IsMongoId()
  user: string;
}
