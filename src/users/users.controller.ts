import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

/// ---------------- Recherche INSTANTANÉE GÉNÉRALE ----------------
  /**
   * Recherche instantanée d'utilisateurs par nom, prénom ou email
   * Retourne jusqu'à 20 résultats maximum
   */
  @Get('search')
  @ApiOperation({ 
    summary: 'Recherche instantanée d\'utilisateurs',
    description: 'Recherche des utilisateurs par nom, prénom ou email. Retourne jusqu\'à 20 résultats maximum sans mot de passe.' 
  })
  @ApiQuery({ 
    name: 'q', 
    type: String, 
    required: true,
    description: 'Texte de recherche (nom, prénom ou email)' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Liste des utilisateurs trouvés',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string', description: 'ID de l\'utilisateur' },
          nom: { type: 'string', description: 'Nom de l\'utilisateur' },
          prenom: { type: 'string', description: 'Prénom de l\'utilisateur' },
          email: { type: 'string', description: 'Email de l\'utilisateur' },
          role: { type: 'string', description: 'Rôle de l\'utilisateur' },
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Paramètre de recherche manquant' 
  })
  async searchUsers(@Query('q') query: string): Promise<User[]> {
    if (!query || query.trim().length === 0) {
      throw new NotFoundException('Veuillez fournir un texte de recherche');
    }

    const results = await this.usersService.searchUsers(query.trim());
    return results;
  }


  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Afficher la liste des utilisateurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des utilisateurs récupérée avec succès.',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Afficher les détails d’un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l’utilisateur à consulter' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé.' })
  @ApiResponse({ status: 404, description: 'Utilisateur introuvable.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l’utilisateur à modifier' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiParam({ name: 'id', description: 'ID de l’utilisateur à supprimer' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }



  
}
