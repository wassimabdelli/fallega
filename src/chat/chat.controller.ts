import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // --- Conversations ---
  @Post('conversations')
  @ApiOperation({ summary: 'Créer une conversation' })
  @ApiResponse({ status: 201, description: 'Conversation créée.' })
  createConversation(@Body() dto: CreateConversationDto) {
    return this.chatService.createConversation(dto);
  }

  @Get('conversations')
  @ApiOperation({ summary: 'Lister les conversations' })
  @ApiResponse({ status: 200, description: 'Liste des conversations.' })
  findAllConversations() {
    return this.chatService.findAllConversations();
  }

  @Get('conversations/:id')
  @ApiOperation({ summary: 'Obtenir une conversation' })
  @ApiResponse({ status: 200, description: 'Conversation trouvée.' })
  findOneConversation(@Param('id') id: string) {
    return this.chatService.findOneConversation(id);
  }

  // --- Messages ---
  @Post('messages')
  @ApiOperation({ summary: 'Envoyer un message' })
  @ApiResponse({ status: 201, description: 'Message envoyé.' })
  createMessage(@Body() dto: CreateMessageDto) {
    return this.chatService.createMessage(dto);
  }

  @Get('conversations/:id/messages')
  @ApiOperation({ summary: 'Lister les messages d’une conversation' })
  @ApiResponse({ status: 200, description: 'Historique des messages.' })
  findMessages(@Param('id') id: string) {
    return this.chatService.findMessagesByConversation(id);
  }
}
