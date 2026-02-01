import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsOptional } from 'class-validator';

export class CreatePaymentProofDto {
  @ApiProperty({ example: 'https://example.com/proof.pdf', description: 'URL du fichier de preuve' })
  @IsString()
  fileUrl: string;

  @ApiProperty({ example: 'Virement effectué le 10/10', description: 'Note optionnelle' })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ example: '60d0fe4f5311236168a109ca', description: 'ID du paiement' })
  @IsMongoId()
  payment: string;
}
