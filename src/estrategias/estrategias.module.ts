import { Module } from '@nestjs/common';
import { EstrategiasService } from './estrategias.service';
import { EstrategiasController } from './estrategias.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EstrategiasController],
  providers: [EstrategiasService, PrismaService],
})
export class EstrategiasModule {}
