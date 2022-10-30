import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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

    if (createAgregadoDto.regras) {
      const regrasJson = JSON.stringify(createAgregadoDto.regras);
      if (!regrasJson) {
        throw new BadRequestException(
          'O conjunto de regras enviado é inválido',
        );
      }

      createAgregadoDto.regras = regrasJson;
    }

    if (createAgregadoDto.projeto_id) {
      const projeto = await this.prisma.projeto.findUnique({
        where: { id: createAgregadoDto.projeto_id },
      });

      if (!projeto) {
        throw new NotFoundException(
          `Não existe projeto com o ID ${createAgregadoDto.projeto_id}`,
        );
      }
    }

    return await this.prisma.agregado.create({
      data: createAgregadoDto,
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

    return await this.prisma.agregado.update({
      where: { id },
      data: updateAgregadoDto,
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
