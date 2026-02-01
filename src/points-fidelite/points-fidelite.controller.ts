import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PointsFideliteService } from './points-fidelite.service';
import { CreatePointsFideliteDto } from './dto/create-points-fidelite.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Points Fidelite')
@Controller('points-fidelite')
export class PointsFideliteController {
  constructor(private readonly pointsFideliteService: PointsFideliteService) {}

  @Post()
  @ApiOperation({ summary: 'Ajouter une transaction de points' })
  @ApiResponse({ status: 201, description: 'Transaction créée.' })
  create(@Body() createPointsFideliteDto: CreatePointsFideliteDto) {
    return this.pointsFideliteService.create(createPointsFideliteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister les transactions de points' })
  @ApiResponse({ status: 200, description: 'Liste des transactions.' })
  findAll() {
    return this.pointsFideliteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Trouver une transaction par ID' })
  @ApiResponse({ status: 200, description: 'Transaction trouvée.' })
  findOne(@Param('id') id: string) {
    return this.pointsFideliteService.findOne(id);
  }
}
