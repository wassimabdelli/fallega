import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsDate } from 'class-validator';

export class UpdateCallDto {
  @ApiProperty({ 
    example: 'accepted', 
    description: 'Statut de l\'appel',
    enum: ['missed', 'accepted', 'rejected', 'ongoing', 'ended'],
    required: false
  })
  @IsEnum(['missed', 'accepted', 'rejected', 'ongoing', 'ended'])
  @IsOptional()
  status?: 'missed' | 'accepted' | 'rejected' | 'ongoing' | 'ended';

  @ApiProperty({ 
    example: 120, 
    description: 'Durée de l\'appel en secondes',
    required: false
  })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiProperty({ 
    example: '2023-12-20T10:30:00.000Z', 
    description: 'Date de fin de l\'appel',
    required: false
  })
  @IsDate()
  @IsOptional()
  endedAt?: Date;
}
