import { Module } from '@nestjs/common';
import { EstrategiasService } from './estrategias.service';
import { EstrategiasController } from './estrategias.controller';

@Module({
  controllers: [EstrategiasController],
  providers: [EstrategiasService]
})
export class EstrategiasModule {}
