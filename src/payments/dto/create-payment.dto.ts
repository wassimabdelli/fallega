import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsMongoId, Min, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'CARD', description: 'Méthode de paiement (CARD, CASH, TRANSFER)' })
  @IsString()
  method: string;

  @ApiProperty({ example: 'PENDING', description: 'Statut du paiement' })
  @IsString()
  status: string;

  @ApiProperty({ example: 100, description: 'Montant' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ example: 'REF123456', description: 'Référence fournisseur' })
  @IsString()
  @IsOptional()
  providerRef?: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'ID de la réservation' })
  @IsMongoId()
  reservation: string;
}
