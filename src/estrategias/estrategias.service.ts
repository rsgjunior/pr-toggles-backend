import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEstrategiaDto } from './dto/create-estrategia.dto';
import { UpdateEstrategiaDto } from './dto/update-estrategia.dto';

@Injectable()
export class EstrategiasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEstrategiaDto: CreateEstrategiaDto) {
    const funcionalidade = await this.prisma.funcionalidade.findUnique({
      where: {
        id: createEstrategiaDto.funcionalidade_id,
      },
    });

    if (!funcionalidade) {
      throw new NotFoundException(
        `Não existe funcionalidade com o ID ${createEstrategiaDto.funcionalidade_id}`,
      );
    }

    return await this.prisma.estrategia.create({
      data: createEstrategiaDto,
      include: {
        funcionalidade: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.estrategia.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.estrategia.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateEstrategiaDto: UpdateEstrategiaDto) {
    const estrategia = await this.prisma.estrategia.findUnique({
      where: { id },
    });

    if (!estrategia) {
      throw new NotFoundException(`Não existe estratégia com o ID ${id}`);
    }

    return await this.prisma.estrategia.update({
      where: { id },
      data: updateEstrategiaDto,
    });
  }

  async remove(id: number) {
    const estrategia = await this.prisma.estrategia.findUnique({
      where: { id },
    });

    if (!estrategia) {
      throw new NotFoundException(`Não existe estratégia com o ID ${id}`);
    }

    return await this.prisma.estrategia.delete({
      where: { id },
    });
  }
}
