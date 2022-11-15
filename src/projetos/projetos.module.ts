import { Module } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { ProjetosController } from './projetos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegrasModule } from 'src/regras/regras.module';

@Module({
  controllers: [ProjetosController],
  providers: [ProjetosService, PrismaService],
  imports: [RegrasModule],
})
export class ProjetosModule {}
