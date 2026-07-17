import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, IsDateString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Tournoi de Football', description: 'Titre de l’événement' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Un grand tournoi pour tous', description: 'Description de l’événement' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'SPORT', description: 'Type d’événement' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL de l’image de couverture' })
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiProperty({ example: 'Stade Municipal', description: 'Nom du lieu' })
  @IsString()
  @IsOptional()
  locationName?: string;

  @ApiProperty({ example: 36.8065, description: 'Latitude' })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty({ example: 10.1815, description: 'Longitude' })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({ example: 50, description: 'Prix de base' })
  @IsNumber()
  @Min(0)
  basePrice: number;

  @ApiProperty({ example: 22, description: 'Capacité maximale' })
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({ example: '2024-12-15', description: 'Date de l’événement' })
  @IsDateString()
  eventDate: string;
}

// DTO for multipart form data (without coverImage property as it comes from file)
export class CreateEventFormDataDto {
  @ApiProperty({ example: 'Tournoi de Football', description: 'Titre de l’événement' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Un grand tournoi pour tous', description: 'Description de l’événement' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'SPORT', description: 'Type d’événement' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'Stade Municipal', description: 'Nom du lieu' })
  @IsString()
  @IsOptional()
  locationName?: string;

  @ApiProperty({ example: 36.8065, description: 'Latitude' })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty({ example: 10.1815, description: 'Longitude' })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({ example: 50, description: 'Prix de base' })
  @IsNumber()
  @Min(0)
  basePrice: number;

  @ApiProperty({ example: 22, description: 'Capacité maximale' })
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({ example: '2024-12-15', description: 'Date de l’événement' })
  @IsDateString()
  eventDate: string;
}
