import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsDate,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Wassim', description: 'Nouveau prénom' })
  @IsString()
  @IsOptional()
  prenom?: string;

  @ApiPropertyOptional({ example: 'Abdelli', description: 'Nouveau nom' })
  @IsString()
  @IsOptional()
  nom?: string;

  @ApiPropertyOptional({
    example: 'wassimd@test.com',
    description: 'Nouvel email',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: '2000-01-01',
    description: 'Nouvelle date de naissance (format YYYY-MM-DD)',
    type: String,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  age?: Date;

  @ApiPropertyOptional({
    example: 987654321,
    description: 'Nouveau numéro de téléphone',
  })
  @IsNumber()
  @IsOptional()
  tel?: number;

  @ApiPropertyOptional({
    example: '654321',
    description: 'Nouveau mot de passe',
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    example: 'USER',
    enum: ['USER', 'ADMIN'],
    description: 'Nouveau rôle attribué',
  })
  @IsEnum(['USER', 'ADMIN'])
  @IsOptional()
  role?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Indique si l\'utilisateur est bloqué',
  })
  @IsOptional()
  isBlocked?: boolean;

  @ApiPropertyOptional({
    example: 'ACTIF',
    enum: ['ACTIF', 'BLOQUER'],
    description: 'Statut du compte (ACTIF ou BLOQUER)',
  })
  @IsEnum(['ACTIF', 'BLOQUER'])
  @IsOptional()
  statusCompte?: string;
}
