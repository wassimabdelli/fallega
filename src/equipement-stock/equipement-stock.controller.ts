import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { EquipementStockService } from './equipement-stock.service';
import { CreateEquipmentItemDto } from './dto/create-equipment-item.dto';
import { UpdateEquipmentItemDto } from './dto/update-equipment-item.dto';
import { SearchEquipmentItemDto } from './dto/search-equipment-item.dto';
import { CreateEquipmentRentalDto } from './dto/create-equipment-rental.dto';
import { UpdateEquipmentRentalDto } from './dto/update-equipment-rental.dto';
import { SearchEquipmentRentalDto } from './dto/search-equipment-rental.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { EquipmentItem } from 'src/schemas/equipement-stock.schemas';
import { EquipmentRental } from 'src/schemas/equipement-stock.schemas';

@ApiTags('Equipement Stock')
@Controller('equipement-stock')
export class EquipementStockController {
  constructor(private readonly equipementStockService: EquipementStockService) {}

  // --- Items CRUD ---
  @Post('items')
  @ApiOperation({ summary: 'Créer un type d\'équipement' })
  @ApiResponse({ status: 201, description: 'Item créé avec succès.', type: EquipmentItem })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiBody({ type: CreateEquipmentItemDto })
  createItem(@Body() dto: CreateEquipmentItemDto) {
    return this.equipementStockService.createItem(dto);
  }

  @Get('items')
  @ApiOperation({ summary: 'Lister tous les types d\'équipements' })
  @ApiResponse({ status: 200, description: 'Liste des items récupérée avec succès.', type: [EquipmentItem] })
  findAllItems() {
    return this.equipementStockService.findAllItems();
  }

  @Get('items/search')
  @ApiOperation({ summary: 'Rechercher des équipements par nom ou description' })
  @ApiResponse({ status: 200, description: 'Résultats de la recherche.' })
  @ApiQuery({ name: 'name', required: false, description: 'Rechercher par nom' })
  @ApiQuery({ name: 'description', required: false, description: 'Rechercher par description' })
  @ApiQuery({ name: 'page', required: false, description: 'Numéro de page', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Nombre d\'éléments par page', type: Number })
  searchItems(@Query() searchDto: SearchEquipmentItemDto) {
    return this.equipementStockService.searchItems(searchDto);
  }

  @Get('items/:id')
  @ApiOperation({ summary: 'Récupérer un équipement par son ID' })
  @ApiResponse({ status: 200, description: 'Item récupéré avec succès.', type: EquipmentItem })
  @ApiResponse({ status: 404, description: 'Item non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID de l\'équipement' })
  findOneItem(@Param('id') id: string) {
    return this.equipementStockService.findOneItem(id);
  }

  @Put('items/:id')
  @ApiOperation({ summary: 'Mettre à jour un équipement' })
  @ApiResponse({ status: 200, description: 'Item mis à jour avec succès.', type: EquipmentItem })
  @ApiResponse({ status: 404, description: 'Item non trouvé.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiParam({ name: 'id', description: 'ID de l\'équipement' })
  @ApiBody({ type: UpdateEquipmentItemDto })
  updateItem(@Param('id') id: string, @Body() dto: UpdateEquipmentItemDto) {
    return this.equipementStockService.updateItem(id, dto);
  }

  @Delete('items/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un équipement' })
  @ApiResponse({ status: 204, description: 'Item supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Item non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID de l\'équipement' })
  removeItem(@Param('id') id: string) {
    return this.equipementStockService.removeItem(id);
  }

  // --- Equipment Rentals CRUD ---
  @Post('rentals')
  @ApiOperation({ summary: 'Ajouter un produit de location' })
  @ApiResponse({ status: 201, description: 'Produit de location ajouté avec succès.', type: EquipmentRental })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiBody({ type: CreateEquipmentRentalDto })
  createRental(@Body() dto: CreateEquipmentRentalDto) {
    return this.equipementStockService.createRental(dto);
  }

  @Get('rentals')
  @ApiOperation({ summary: 'Lister tous les produits de location' })
  @ApiResponse({ status: 200, description: 'Liste des produits de location récupérée avec succès.', type: [EquipmentRental] })
  findAllRentals() {
    return this.equipementStockService.findAllRentals();
  }

  @Get('rentals/search')
  @ApiOperation({ summary: 'Rechercher et filtrer les produits de location' })
  @ApiResponse({ status: 200, description: 'Résultats de la recherche.' })
  @ApiQuery({ name: 'name', required: false, description: 'Rechercher par nom' })
  @ApiQuery({ name: 'description', required: false, description: 'Rechercher par description' })
  @ApiQuery({ name: 'category', required: false, description: 'Filtrer par catégorie' })
  @ApiQuery({ name: 'minDailyPrice', required: false, description: 'Prix journalier minimum', type: Number })
  @ApiQuery({ name: 'maxDailyPrice', required: false, description: 'Prix journalier maximum', type: Number })
  @ApiQuery({ name: 'minQuantityAvailable', required: false, description: 'Quantité disponible minimale', type: Number })
  @ApiQuery({ name: 'maxQuantityAvailable', required: false, description: 'Quantité disponible maximale', type: Number })
  @ApiQuery({ name: 'isAvailable', required: false, description: 'Filtrer les produits disponibles', type: Boolean })
  @ApiQuery({ name: 'isActive', required: false, description: 'Filtrer les produits actifs', type: Boolean })
  @ApiQuery({ name: 'outOfStock', required: false, description: 'Filtrer les produits en rupture', type: Boolean })
  @ApiQuery({ name: 'page', required: false, description: 'Numéro de page', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Nombre d\'éléments par page', type: Number })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Champ de tri' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Ordre de tri (asc/desc)' })
  searchRentals(@Query() searchDto: SearchEquipmentRentalDto) {
    return this.equipementStockService.searchRentals(searchDto);
  }

  @Get('rentals/:id')
  @ApiOperation({ summary: 'Récupérer un produit de location par son ID' })
  @ApiResponse({ status: 200, description: 'Produit de location récupéré avec succès.', type: EquipmentRental })
  @ApiResponse({ status: 404, description: 'Produit de location non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID du produit de location' })
  findOneRental(@Param('id') id: string) {
    return this.equipementStockService.findOneRental(id);
  }

  @Put('rentals/:id')
  @ApiOperation({ summary: 'Mettre à jour un produit de location' })
  @ApiResponse({ status: 200, description: 'Produit de location mis à jour avec succès.', type: EquipmentRental })
  @ApiResponse({ status: 404, description: 'Produit de location non trouvé.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiParam({ name: 'id', description: 'ID du produit de location' })
  @ApiBody({ type: UpdateEquipmentRentalDto })
  updateRental(@Param('id') id: string, @Body() dto: UpdateEquipmentRentalDto) {
    return this.equipementStockService.updateRental(id, dto);
  }

  @Put('rentals/:id/quantity')
  @ApiOperation({ summary: 'Mettre à jour la quantité disponible d\'un produit de location' })
  @ApiResponse({ status: 200, description: 'Quantité mise à jour avec succès.', type: EquipmentRental })
  @ApiResponse({ status: 404, description: 'Produit de location non trouvé.' })
  @ApiResponse({ status: 400, description: 'Quantité invalide.' })
  @ApiParam({ name: 'id', description: 'ID du produit de location' })
  @ApiBody({ schema: { type: 'object', properties: { quantityChange: { type: 'number', description: 'Changement de quantité (positif pour ajouter, négatif pour retirer)' } } } })
  updateRentalQuantity(@Param('id') id: string, @Body('quantityChange') quantityChange: number) {
    return this.equipementStockService.updateRentalQuantity(id, quantityChange);
  }

  @Delete('rentals/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un produit de location' })
  @ApiResponse({ status: 204, description: 'Produit de location supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Produit de location non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID du produit de location' })
  removeRental(@Param('id') id: string) {
    return this.equipementStockService.removeRental(id);
  }
}
