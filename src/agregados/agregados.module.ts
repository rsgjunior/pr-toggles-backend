import { Module } from '@nestjs/common';
import { AgregadosService } from './agregados.service';
import { AgregadosController } from './agregados.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AgregadosController],
  providers: [AgregadosService, PrismaService],
})
export class AgregadosModule {}
