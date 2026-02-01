import { Injectable } from '@nestjs/common';
import { CreateChatGlobalDto } from './dto/create-chat-global.dto';
import { UpdateChatGlobalDto } from './dto/update-chat-global.dto';

@Injectable()
export class ChatGlobalService {
  create(createChatGlobalDto: CreateChatGlobalDto) {
    return 'This action adds a new chatGlobal';
  }

  findAll() {
    return `This action returns all chatGlobal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatGlobal`;
  }

  update(id: number, updateChatGlobalDto: UpdateChatGlobalDto) {
    return `This action updates a #${id} chatGlobal`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatGlobal`;
  }
}
