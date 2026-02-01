import { Test, TestingModule } from '@nestjs/testing';
import { PointsFideliteController } from './points-fidelite.controller';
import { PointsFideliteService } from './points-fidelite.service';

describe('PointsFideliteController', () => {
  let controller: PointsFideliteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointsFideliteController],
      providers: [PointsFideliteService],
    }).compile();

    controller = module.get<PointsFideliteController>(PointsFideliteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
