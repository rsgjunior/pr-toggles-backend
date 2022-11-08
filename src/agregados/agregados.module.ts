import { Module } from '@nestjs/common';
import { AgregadosService } from './agregados.service';
import { AgregadosController } from './agregados.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegrasModule } from 'src/regras/regras.module';

@Module({
  imports: [RegrasModule],
  controllers: [AgregadosController],
  providers: [AgregadosService, PrismaService],
})
export class AgregadosModule {}
