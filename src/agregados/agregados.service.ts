import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAgregadoDto } from './dto/create-agregado.dto';
import { UpdateAgregadoDto } from './dto/update-agregado.dto';

@Injectable()
export class AgregadosService {
  private readonly logger = new Logger(AgregadosService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createAgregadoDto: CreateAgregadoDto) {
    this.logger.log('create');

    const projeto = await this.prisma.projeto.findUnique({
      where: { id: createAgregadoDto.projeto_id },
    });

    if (!projeto) {
      throw new NotFoundException(
        `Não existe projeto com o ID ${createAgregadoDto.projeto_id}`,
      );
    }

    const { projeto_id, regras } = createAgregadoDto;

    // Inicia a construção do obj com os dados em comum
    const data: Prisma.AgregadoCreateInput = {
      ...createAgregadoDto,
      regras: JSON.stringify(regras),
      projeto: {
        connect: { id: projeto_id },
      },
    };

    return await this.prisma.agregado.create({
      data,
      include: { estrategia_has_agregado: true },
    });
  }

  async findMany(
    params: {
      where?: Prisma.AgregadoWhereInput;
      include?: Prisma.AgregadoInclude;
    } = {},
  ) {
    this.logger.log('findMany');

    const { where, include } = params;

    return await this.prisma.agregado.findMany({ where, include });
  }

  async findOne(id: number) {
    this.logger.log('findOne');

    const agregado = await this.prisma.agregado.findUnique({
      where: { id },
    });

    if (!agregado) {
      throw new NotFoundException(`Não existe agregado com o ID ${id}`);
    }

    return agregado;
  }

  async update(id: number, updateAgregadoDto: UpdateAgregadoDto) {
    this.logger.log('update');

    const agregado = await this.prisma.agregado.findUnique({
      where: { id },
    });

    if (!agregado) {
      throw new NotFoundException(`Não existe agregado com o ID ${id}`);
    }

    const data: Prisma.AgregadoUpdateInput = {};

    if (updateAgregadoDto.nome) data.nome = updateAgregadoDto.nome;
    if (updateAgregadoDto.descricao)
      data.descricao = updateAgregadoDto.descricao;
    if (updateAgregadoDto.regras)
      data.regras = JSON.stringify(updateAgregadoDto.regras);

    return await this.prisma.agregado.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    this.logger.log('remove');

    const agregado = await this.prisma.agregado.findUnique({
      where: { id },
    });

    if (!agregado) {
      throw new NotFoundException(`Não existe agregado com o ID ${id}`);
    }

    return await this.prisma.agregado.delete({
      where: { id },
    });
  }
}
