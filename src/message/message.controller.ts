import { Controller, Get, Post, Body, Param, Put, Delete, Query, HttpCode, HttpStatus, Request, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { SearchMessageDto } from './dto/search-message.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { Message } from '../schemas/message.schemas';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { mkdir, writeFile } from 'fs/promises';
import { extname, join } from 'path';

@ApiTags('Messages')
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau message' })
  @ApiResponse({ status: 201, description: 'Message créé avec succès.', type: Message })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiBody({ type: CreateMessageDto })
  create(@Body() createMessageDto: CreateMessageDto, @Request() req: any) {
    return this.messageService.create(createMessageDto, req.user.userId);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Uploader un fichier de chat' })
  @ApiResponse({ status: 201, description: 'Fichier uploadé avec succès.' })
  @ApiResponse({ status: 400, description: 'Fichier invalide.' })
  async uploadChatFile(
    @UploadedFile() file: any,
    @Request() req: any,
  ) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    const uploadsDir = join(process.cwd(), 'uploads', 'chat');
    await mkdir(uploadsDir, { recursive: true });

    const safeBaseName = file.originalname
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 60);
    const extension = extname(file.originalname) || '';
    const finalName = `${Date.now()}_${safeBaseName || 'file'}${extension}`;
    const finalPath = join(uploadsDir, finalName);

    await writeFile(finalPath, file.buffer);

    const host = req.get('host');
    const protocol = req.protocol;
    return {
      fileName: file.originalname,
      fileUrl: `${protocol}://${host}/uploads/chat/${finalName}`,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les messages actifs' })
  @ApiResponse({ status: 200, description: 'Liste des messages récupérée avec succès.', type: [Message] })
  findAll() {
    return this.messageService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Rechercher et filtrer les messages' })
  @ApiResponse({ status: 200, description: 'Résultats de la recherche.' })
  @ApiQuery({ name: 'sender', required: false, description: 'Filtrer par ID de l\'expéditeur' })
  @ApiQuery({ name: 'receiver', required: false, description: 'Filtrer par ID du destinataire' })
  @ApiQuery({ name: 'userId', required: false, description: 'Filtrer par conversation (utilisateur courant)' })
  @ApiQuery({ name: 'content', required: false, description: 'Rechercher par contenu' })
  @ApiQuery({ name: 'messageType', required: false, description: 'Filtrer par type de message' })
  @ApiQuery({ name: 'isRead', required: false, description: 'Filtrer les messages lus/non lus', type: Boolean })
  @ApiQuery({ name: 'isDeleted', required: false, description: 'Filtrer les messages supprimés', type: Boolean })
  @ApiQuery({ name: 'dateFrom', required: false, description: 'Filtrer les messages après cette date' })
  @ApiQuery({ name: 'dateTo', required: false, description: 'Filtrer les messages avant cette date' })
  @ApiQuery({ name: 'page', required: false, description: 'Numéro de page', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Nombre d\'éléments par page', type: Number })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Champ de tri' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Ordre de tri (asc/desc)' })
  searchMessages(@Query() searchDto: SearchMessageDto) {
    return this.messageService.searchMessages(searchDto);
  }

  @Get('conversation/:userId1/:userId2')
  @ApiOperation({ summary: 'Récupérer une conversation entre deux utilisateurs' })
  @ApiResponse({ status: 200, description: 'Conversation récupérée avec succès.' })
  @ApiParam({ name: 'userId1', description: 'ID du premier utilisateur' })
  @ApiParam({ name: 'userId2', description: 'ID du deuxième utilisateur' })
  @ApiQuery({ name: 'page', required: false, description: 'Numéro de page', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Nombre d\'éléments par page', type: Number })
  getConversation(
    @Param('userId1') userId1: string,
    @Param('userId2') userId2: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.messageService.getConversation(userId1, userId2, page, limit);
  }

  @Get('unread/:userId')
  @ApiOperation({ summary: 'Récupérer les messages non lus d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Messages non lus récupérés avec succès.', type: [Message] })
  @ApiParam({ name: 'userId', description: 'ID de l\'utilisateur' })
  getUnreadMessages(@Param('userId') userId: string) {
    return this.messageService.getUnreadMessages(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un message par son ID' })
  @ApiResponse({ status: 200, description: 'Message récupéré avec succès.', type: Message })
  @ApiResponse({ status: 404, description: 'Message non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID du message' })
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un message' })
  @ApiResponse({ status: 200, description: 'Message mis à jour avec succès.', type: Message })
  @ApiResponse({ status: 404, description: 'Message non trouvé.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiParam({ name: 'id', description: 'ID du message' })
  @ApiBody({ type: UpdateMessageDto })
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Marquer un message comme lu' })
  @ApiResponse({ status: 200, description: 'Message marqué comme lu avec succès.', type: Message })
  @ApiResponse({ status: 404, description: 'Message non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID du message' })
  markAsRead(@Param('id') id: string) {
    return this.messageService.markAsRead(id);
  }

  @Put('read-all/:userId')
  @ApiOperation({ summary: 'Marquer tous les messages d\'un utilisateur comme lus' })
  @ApiResponse({ status: 200, description: 'Messages marqués comme lus avec succès.' })
  @ApiParam({ name: 'userId', description: 'ID de l\'utilisateur destinataire' })
  @ApiQuery({ name: 'senderId', required: false, description: 'ID de l\'expéditeur (optionnel)' })
  markAllAsRead(
    @Param('userId') userId: string,
    @Query('senderId') senderId?: string,
  ) {
    return this.messageService.markAllAsRead(userId, senderId);
  }

  @Put(':id/soft-delete')
  @ApiOperation({ summary: 'Supprimer un message (soft delete)' })
  @ApiResponse({ status: 200, description: 'Message supprimé avec succès.', type: Message })
  @ApiResponse({ status: 404, description: 'Message non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID du message' })
  softDelete(@Param('id') id: string) {
    return this.messageService.softDelete(id);
  }

  @Delete('conversation/:userId1/:userId2')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Supprimer une conversation entre deux utilisateurs' })
  @ApiResponse({ status: 200, description: 'Conversation supprimée avec succès.' })
  @ApiParam({ name: 'userId1', description: 'ID du premier utilisateur' })
  @ApiParam({ name: 'userId2', description: 'ID du deuxième utilisateur' })
  deleteConversation(@Param('userId1') userId1: string, @Param('userId2') userId2: string) {
    return this.messageService.deleteConversation(userId1, userId2);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer définitivement un message' })
  @ApiResponse({ status: 204, description: 'Message supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Message non trouvé.' })
  @ApiParam({ name: 'id', description: 'ID du message' })
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
