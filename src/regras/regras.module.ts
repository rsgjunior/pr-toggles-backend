import { Module } from '@nestjs/common';
import { RegrasService } from './regras.service';
import { RegrasController } from './regras.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RegrasController],
  providers: [RegrasService, PrismaService]
})
export class RegrasModule {}
