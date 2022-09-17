import { Test, TestingModule } from '@nestjs/testing';
import { RegrasController } from './regras.controller';
import { RegrasService } from './regras.service';

describe('RegrasController', () => {
  let controller: RegrasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegrasController],
      providers: [RegrasService],
    }).compile();

    controller = module.get<RegrasController>(RegrasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
