import { Module } from '@nestjs/common';
import { RegrasService } from './regras.service';

@Module({
  providers: [RegrasService]
})
export class RegrasModule {}
