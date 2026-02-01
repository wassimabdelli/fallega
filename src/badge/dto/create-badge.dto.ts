import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsDateString } from 'class-validator';

export class CreateBadgeDto {
  @ApiProperty({ example: 'Champion', description: 'Nom du badge' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/badge.png', description: 'Icône du badge' })
  @IsString()
  icon: string;

  @ApiProperty({ example: '2023-10-01T10:00:00Z', description: 'Date d’obtention' })
  @IsDateString()
  awardedAt: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'ID de l’utilisateur' })
  @IsMongoId()
  user: string;
}
