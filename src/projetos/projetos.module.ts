import { Module } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { ProjetosController } from './projetos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegrasModule } from 'src/regras/regras.module';
import { VariacoesModule } from 'src/variacoes/variacoes.module';

@Module({
  controllers: [ProjetosController],
  providers: [ProjetosService, PrismaService],
  imports: [RegrasModule, VariacoesModule],
})
export class ProjetosModule {}
