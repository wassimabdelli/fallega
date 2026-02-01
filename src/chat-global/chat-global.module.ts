import { Module } from '@nestjs/common';
import { ChatGlobalService } from './chat-global.service';
import { ChatGlobalController } from './chat-global.controller';

@Module({
  controllers: [ChatGlobalController],
  providers: [ChatGlobalService],
})
export class ChatGlobalModule {}
