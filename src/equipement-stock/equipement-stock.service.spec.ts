import { Test, TestingModule } from '@nestjs/testing';
import { EquipementStockService } from './equipement-stock.service';

describe('EquipementStockService', () => {
  let service: EquipementStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipementStockService],
    }).compile();

    service = module.get<EquipementStockService>(EquipementStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
