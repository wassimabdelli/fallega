import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatGlobalService } from './chat-global.service';
import { CreateChatGlobalDto } from './dto/create-chat-global.dto';
import { UpdateChatGlobalDto } from './dto/update-chat-global.dto';

@Controller('chat-global')
export class ChatGlobalController {
  constructor(private readonly chatGlobalService: ChatGlobalService) {}

  @Post()
  create(@Body() createChatGlobalDto: CreateChatGlobalDto) {
    return this.chatGlobalService.create(createChatGlobalDto);
  }

  @Get()
  findAll() {
    return this.chatGlobalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatGlobalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatGlobalDto: UpdateChatGlobalDto) {
    return this.chatGlobalService.update(+id, updateChatGlobalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatGlobalService.remove(+id);
  }
}
