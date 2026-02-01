import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsMongoId, Min } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ example: 'CONFIRMED', description: 'Statut de la réservation' })
  @IsString()
  status: string;

  @ApiProperty({ example: 2, description: 'Nombre de sièges réservés' })
  @IsNumber()
  @Min(1)
  seats: number;

  @ApiProperty({ example: 100, description: 'Montant total' })
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'ID de l’utilisateur' })
  @IsMongoId()
  user: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109cb', description: 'ID de l’événement' })
  @IsMongoId()
  event: string;
}
