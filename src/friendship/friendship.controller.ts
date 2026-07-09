import { Controller, Get, Post, Delete, Param, UseGuards, Body } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Friendships')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('friendships')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une amitié' })
  @ApiResponse({ status: 201, description: 'Amitié créée.' })
  create(@Body() createFriendshipDto: CreateFriendshipDto) {
    return this.friendshipService.create(createFriendshipDto);
  }

  @Get('check/:userId1/:userId2')
  @ApiOperation({ summary: 'Vérifier si deux utilisateurs sont amis' })
  @ApiResponse({ status: 200, description: 'Retourne un booléen.' })
  isFriend(@Param('userId1') userId1: string, @Param('userId2') userId2: string) {
    return this.friendshipService.isFriend(userId1, userId2);
  }

  @Get('count/:userId')
  @ApiOperation({ summary: 'Récupérer le nombre d\'amis d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Nombre d\'amis retourné.' })
  getFriendCount(@Param('userId') userId: string) {
    return this.friendshipService.getFriendCount(userId);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Lister les amis d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des amitiés trouvée.' })
  getFriends(@Param('userId') userId: string) {
    return this.friendshipService.getFriends(userId);
  }

  @Delete(':userId1/:userId2')
  @ApiOperation({ summary: 'Supprimer une amitié' })
  @ApiResponse({ status: 200, description: 'Amitié supprimée.' })
  @ApiResponse({ status: 404, description: 'Non trouvé.' })
  removeFriend(@Param('userId1') userId1: string, @Param('userId2') userId2: string) {
    return this.friendshipService.removeFriend(userId1, userId2);
  }
}
