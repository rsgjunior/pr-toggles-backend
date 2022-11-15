import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChavesService {
  private readonly logger = new Logger(ChavesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findMany(
    params: {
      where?: Prisma.ChaveWhereInput;
      include?: Prisma.ChaveInclude;
    } = {},
  ) {
    this.logger.log('findMany');

    const { where, include } = params;

    return await this.prisma.chave.findMany({
      where,
      include,
    });
  }
}
