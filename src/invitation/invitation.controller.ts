import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Invitations')
@Controller('invitations')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une invitation' })
  @ApiResponse({ status: 201, description: 'Invitation créée.' })
  create(@Body() createInvitationDto: CreateInvitationDto) {
    return this.invitationService.create(createInvitationDto);
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
}
