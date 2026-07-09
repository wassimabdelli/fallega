import { 
  Controller, 
  Get, 
  Put, 
  Param, 
  Body, 
  UseGuards,
  NotFoundException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CallService } from './call.service';
import { UpdateCallDto } from './dto/update-call.dto';

@ApiTags('Calls')
@Controller('call')
@UseGuards(JwtAuthGuard)
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Get('history/:userId')
  @ApiOperation({ summary: 'Récupérer l\'historique des appels d\'un utilisateur' })
  @ApiParam({ name: 'userId', description: 'ID de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Historique des appels récupéré avec succès' })
  async getCallHistory(@Param('userId') userId: string) {
    return this.callService.getCallHistory(userId);
  }

  @Get('missed/:userId')
  @ApiOperation({ summary: 'Récupérer les appels manqués d\'un utilisateur' })
  @ApiParam({ name: 'userId', description: 'ID de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Appels manqués récupérés avec succès' })
  async getMissedCalls(@Param('userId') userId: string) {
    return this.callService.getMissedCalls(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un appel par son ID' })
  @ApiParam({ name: 'id', description: 'ID de l\'appel' })
  @ApiResponse({ status: 200, description: 'Appel récupéré avec succès' })
  @ApiResponse({ status: 404, description: 'Appel non trouvé' })
  async findOne(@Param('id') id: string) {
    return this.callService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour le statut d\'un appel' })
  @ApiParam({ name: 'id', description: 'ID de l\'appel' })
  @ApiResponse({ status: 200, description: 'Appel mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Appel non trouvé' })
  async update(@Param('id') id: string, @Body() updateCallDto: UpdateCallDto) {
    return this.callService.update(id, updateCallDto);
  }
}
