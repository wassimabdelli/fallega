import { Test, TestingModule } from '@nestjs/testing';
import { PointsFideliteService } from './points-fidelite.service';

describe('PointsFideliteService', () => {
  let service: PointsFideliteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointsFideliteService],
    }).compile();

    service = module.get<PointsFideliteService>(PointsFideliteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
