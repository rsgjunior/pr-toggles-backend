import { Module } from '@nestjs/common';
import { FuncionalidadesService } from './funcionalidades.service';
import { FuncionalidadesController } from './funcionalidades.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FuncionalidadesController],
  providers: [FuncionalidadesService, PrismaService],
})
export class FuncionalidadesModule {}
