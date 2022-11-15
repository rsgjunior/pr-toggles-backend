import { Module } from '@nestjs/common';
import { ChavesService } from './chaves.service';
import { ChavesController } from './chaves.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ChavesService, PrismaService],
  controllers: [ChavesController],
})
export class ChavesModule {}
