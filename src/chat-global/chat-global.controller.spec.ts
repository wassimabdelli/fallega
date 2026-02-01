import { Test, TestingModule } from '@nestjs/testing';
import { ChatGlobalController } from './chat-global.controller';
import { ChatGlobalService } from './chat-global.service';

describe('ChatGlobalController', () => {
  let controller: ChatGlobalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatGlobalController],
      providers: [ChatGlobalService],
    }).compile();

    controller = module.get<ChatGlobalController>(ChatGlobalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
