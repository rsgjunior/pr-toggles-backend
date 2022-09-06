import { Module } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { ProjetosController } from './projetos.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProjetosController],
  providers: [ProjetosService, PrismaService],
})
export class ProjetosModule {}
