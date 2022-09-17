import { Test, TestingModule } from '@nestjs/testing';
import { RegrasService } from './regras.service';

describe('RegrasService', () => {
  let service: RegrasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegrasService],
    }).compile();

    service = module.get<RegrasService>(RegrasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
