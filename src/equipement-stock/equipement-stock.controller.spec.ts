import { Test, TestingModule } from '@nestjs/testing';
import { EquipementStockController } from './equipement-stock.controller';
import { EquipementStockService } from './equipement-stock.service';

describe('EquipementStockController', () => {
  let controller: EquipementStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipementStockController],
      providers: [EquipementStockService],
    }).compile();

    controller = module.get<EquipementStockController>(EquipementStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
