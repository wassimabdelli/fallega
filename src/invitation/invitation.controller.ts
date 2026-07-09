import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Invitations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('invitations')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une invitation' })
  @ApiResponse({ status: 201, description: 'Invitation créée.' })
  create(@Body() createInvitationDto: CreateInvitationDto, @Request() req) {
    return this.invitationService.create(createInvitationDto, req.user.userId);
  }

  @Get('received/:userId')
  @ApiOperation({ summary: 'Lister les invitations reçues par un utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des invitations reçues.' })
  findByReceiver(@Param('userId') userId: string) {
    return this.invitationService.findByReceiver(userId);
  }

  @Get('sent/:userId')
  @ApiOperation({ summary: 'Lister les invitations envoyées par un utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des invitations envoyées.' })
  findBySender(@Param('userId') userId: string) {
    return this.invitationService.findBySender(userId);
  }

  @Get('pending/:userId')
  @ApiOperation({ summary: 'Lister les invitations en attente pour un utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des invitations en attente.' })
  findPending(@Param('userId') userId: string) {
    return this.invitationService.findPending(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les invitations' })
  @ApiResponse({ status: 200, description: 'Liste des invitations.' })
  findAll() {
    return this.invitationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Trouver une invitation par ID' })
  @ApiResponse({ status: 200, description: 'Invitation trouvée.' })
  @ApiResponse({ status: 404, description: 'Non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.invitationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une invitation' })
  @ApiResponse({ status: 200, description: 'Mis à jour.' })
  update(@Param('id') id: string, @Body() updateInvitationDto: UpdateInvitationDto) {
    return this.invitationService.update(id, updateInvitationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une invitation' })
  @ApiResponse({ status: 200, description: 'Supprimé.' })
  remove(@Param('id') id: string) {
    return this.invitationService.remove(id);
  }

  @Patch(':id/accept')
  @ApiOperation({ summary: 'Accepter une invitation' })
  @ApiResponse({ status: 200, description: 'Invitation acceptée.' })
  @ApiResponse({ status: 404, description: 'Non trouvé.' })
  accept(@Param('id') id: string) {
    return this.invitationService.acceptInvitation(id);
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Rejeter une invitation' })
  @ApiResponse({ status: 200, description: 'Invitation rejetée.' })
  @ApiResponse({ status: 404, description: 'Non trouvé.' })
  reject(@Param('id') id: string) {
    return this.invitationService.rejectInvitation(id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Annuler une invitation' })
  @ApiResponse({ status: 200, description: 'Invitation annulée.' })
  @ApiResponse({ status: 404, description: 'Non trouvé.' })
  cancel(@Param('id') id: string) {
    return this.invitationService.cancelInvitation(id);
  }
}
