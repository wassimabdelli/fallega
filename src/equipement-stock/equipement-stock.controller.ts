import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EquipementStockService } from './equipement-stock.service';
import { CreateEquipmentItemDto } from './dto/create-equipment-item.dto';
import { CreateEquipementStockDto } from './dto/create-equipement-stock.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Equipement Stock')
@Controller('equipement-stock')
export class EquipementStockController {
  constructor(private readonly equipementStockService: EquipementStockService) {}

  // --- Items ---
  @Post('items')
  @ApiOperation({ summary: 'Créer un type d’équipement' })
  @ApiResponse({ status: 201, description: 'Item créé.' })
  createItem(@Body() dto: CreateEquipmentItemDto) {
    return this.equipementStockService.createItem(dto);
  }

  @Get('items')
  @ApiOperation({ summary: 'Lister les types d’équipements' })
  @ApiResponse({ status: 200, description: 'Liste des items.' })
  findAllItems() {
    return this.equipementStockService.findAllItems();
  }

  // --- Stocks ---
  @Post('stocks')
  @ApiOperation({ summary: 'Ajouter du stock' })
  @ApiResponse({ status: 201, description: 'Stock ajouté.' })
  createStock(@Body() dto: CreateEquipementStockDto) {
    return this.equipementStockService.createStock(dto);
  }

  @Get('stocks')
  @ApiOperation({ summary: 'Lister les stocks' })
  @ApiResponse({ status: 200, description: 'Liste des stocks.' })
  findAllStocks() {
    return this.equipementStockService.findAllStocks();
  }
}
