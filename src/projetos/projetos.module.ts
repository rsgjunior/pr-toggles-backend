import { Module } from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { ProjetosController } from './projetos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegrasModule } from 'src/regras/regras.module';
import { VariacoesModule } from 'src/variacoes/variacoes.module';
import { RegrasService } from 'src/regras/regras.service';

@Module({
  controllers: [ProjetosController],
  providers: [ProjetosService, PrismaService, RegrasService],
  imports: [VariacoesModule],
})
export class ProjetosModule {}
