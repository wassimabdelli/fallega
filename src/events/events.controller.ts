import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, CreateEventFormDataDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel événement' })
  @ApiResponse({ status: 201, description: 'Événement créé avec succès.' })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Post('with-image')
  @ApiOperation({ summary: 'Créer un événement avec upload d\'image' })
  @ApiResponse({ status: 201, description: 'Événement créé avec succès.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('coverImage'))
  async createWithImage(
    @UploadedFile() file: any,
    @Body() createEventDto: CreateEventFormDataDto,
  ) {
    if (!file) {
      throw new BadRequestException('L\'image de couverture est requise');
    }

    // Upload image to Cloudinary
    const uploadResult: any = await this.cloudinaryService.uploadImage(
      file.buffer,
      'events'
    );

    // Create event with image URL
    const eventData: CreateEventDto = {
      ...createEventDto,
      coverImage: uploadResult.secure_url,
    };

    return this.eventsService.create(eventData);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les événements' })
  @ApiResponse({ status: 200, description: 'Liste des événements.' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un événement par ID' })
  @ApiResponse({ status: 200, description: 'Événement trouvé.' })
  @ApiResponse({ status: 404, description: 'Événement non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un événement' })
  @ApiResponse({ status: 200, description: 'Événement mis à jour.' })
  @ApiResponse({ status: 404, description: 'Événement non trouvé.' })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un événement' })
  @ApiResponse({ status: 200, description: 'Événement supprimé.' })
  @ApiResponse({ status: 404, description: 'Événement non trouvé.' })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
