import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePaymentProofDto } from './dto/create-payment-proof.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // --- Payments ---
  @Post()
  @ApiOperation({ summary: 'Créer un paiement' })
  @ApiResponse({ status: 201, description: 'Paiement créé.' })
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.createPayment(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister les paiements' })
  @ApiResponse({ status: 200, description: 'Liste des paiements.' })
  findAllPayments() {
    return this.paymentsService.findAllPayments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Trouver un paiement par ID' })
  @ApiResponse({ status: 200, description: 'Paiement trouvé.' })
  @ApiResponse({ status: 404, description: 'Non trouvé.' })
  findOnePayment(@Param('id') id: string) {
    return this.paymentsService.findOnePayment(id);
  }

  // --- Proofs ---
  @Post('proofs')
  @ApiOperation({ summary: 'Ajouter une preuve de paiement' })
  @ApiResponse({ status: 201, description: 'Preuve ajoutée.' })
  createProof(@Body() dto: CreatePaymentProofDto) {
    return this.paymentsService.createProof(dto);
  }

  @Get('proofs')
  @ApiOperation({ summary: 'Lister les preuves' })
  @ApiResponse({ status: 200, description: 'Liste des preuves.' })
  findAllProofs() {
    return this.paymentsService.findAllProofs();
  }
}
