import { Module } from '@nestjs/common';
import { RegrasService } from './regras.service';

@Module({
  providers: [RegrasService],
  exports: [RegrasService],
})
export class RegrasModule {}
