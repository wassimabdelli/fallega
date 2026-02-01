import { Test, TestingModule } from '@nestjs/testing';
import { ChatGlobalService } from './chat-global.service';

describe('ChatGlobalService', () => {
  let service: ChatGlobalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGlobalService],
    }).compile();

    service = module.get<ChatGlobalService>(ChatGlobalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
