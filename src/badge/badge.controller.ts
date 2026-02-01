import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Badges')
@Controller('badges')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Post()
  @ApiOperation({ summary: 'Attribuer un badge' })
  @ApiResponse({ status: 201, description: 'Badge attribué.' })
  create(@Body() createBadgeDto: CreateBadgeDto) {
    return this.badgeService.create(createBadgeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister les badges' })
  @ApiResponse({ status: 200, description: 'Liste des badges.' })
  findAll() {
    return this.badgeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Trouver un badge par ID' })
  @ApiResponse({ status: 200, description: 'Badge trouvé.' })
  @ApiResponse({ status: 404, description: 'Non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.badgeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un badge' })
  @ApiResponse({ status: 200, description: 'Mis à jour.' })
  update(@Param('id') id: string, @Body() updateBadgeDto: UpdateBadgeDto) {
    return this.badgeService.update(id, updateBadgeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un badge' })
  @ApiResponse({ status: 200, description: 'Supprimé.' })
  remove(@Param('id') id: string) {
    return this.badgeService.remove(id);
  }
}
