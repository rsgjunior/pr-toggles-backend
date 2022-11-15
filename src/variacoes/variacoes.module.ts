import { Module } from '@nestjs/common';
import { VariacoesService } from './variacoes.service';

@Module({
  providers: [VariacoesService],
  exports: [VariacoesService],
})
export class VariacoesModule {}
