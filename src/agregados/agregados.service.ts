import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegrasService } from 'src/regras/regras.service';
import { CreateAgregadoDto } from './dto/create-agregado.dto';
import { UpdateAgregadoDto } from './dto/update-agregado.dto';

@Injectable()
export class AgregadosService {
  private readonly logger = new Logger(AgregadosService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly regrasService: RegrasService,
  ) {}

  async create(createAgregadoDto: CreateAgregadoDto) {
    this.logger.log('create');

    // Tem que ter ao menos um dos dois informados
    if (!createAgregadoDto.projeto_id && !createAgregadoDto.estrategia_id) {
      throw new BadRequestException(
        'Tem que ser informado um projeto_id ou estrategia_id',
      );
    }

    // Agregado não pode ser para os dois ao mesmo tempo
    if (createAgregadoDto.projeto_id && createAgregadoDto.estrategia_id) {
      throw new BadRequestException(
        'Foi fornecido um projeto_id e um estrategia_id simultaneamente.',
      );
    }

    // Inicia a construção do obj com os dados em comum
    const data: Prisma.AgregadoCreateInput = {
      nome: createAgregadoDto.nome,
      regras: JSON.stringify(createAgregadoDto.regras),
      descricao: createAgregadoDto.descricao,
    };

    if (createAgregadoDto.projeto_id) {
      const projeto = await this.prisma.projeto.findUnique({
        where: { id: createAgregadoDto.projeto_id },
      });

      if (!projeto) {
        throw new NotFoundException(
          `Não existe projeto com o ID ${createAgregadoDto.projeto_id}`,
        );
      }

      data.projeto = {
        connect: { id: createAgregadoDto.projeto_id },
      };
    } else if (createAgregadoDto.estrategia_id) {
      const estrategia = await this.prisma.estrategia.findUnique({
        where: { id: createAgregadoDto.estrategia_id },
      });

      if (!estrategia) {
        throw new NotFoundException(
          `Não existe estrategia com o ID ${createAgregadoDto.estrategia_id}`,
        );
      }

      data.estrategia_has_agregado = {
        create: {
          ativado: createAgregadoDto.ativado,
          valor: createAgregadoDto.valor,
          variacoes: createAgregadoDto.variacoes,
          estrategia: {
            connect: { id: createAgregadoDto.estrategia_id },
          },
        },
      };
    }

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

    /* // Tem que ter ao menos um dos dois informados
    if (!updateAgregadoDto.projeto_id && !updateAgregadoDto.estrategia_id) {
      throw new BadRequestException(
        'Tem que ser informado um projeto_id ou estrategia_id',
      );
    }

    // Agregado não pode ser para os dois ao mesmo tempo
    if (updateAgregadoDto.projeto_id && updateAgregadoDto.estrategia_id) {
      throw new BadRequestException(
        'Foi fornecido um projeto_id e um estrategia_id simultaneamente.',
      );
    }

    // Inicia a construção do obj com os dados em comum
    const data: Prisma.AgregadoCreateInput = {
      nome: createAgregadoDto.nome,
      regras: JSON.stringify(createAgregadoDto.regras),
      descricao: createAgregadoDto.descricao,
    };

    if (createAgregadoDto.projeto_id) {
      const projeto = await this.prisma.projeto.findUnique({
        where: { id: createAgregadoDto.projeto_id },
      });

      if (!projeto) {
        throw new NotFoundException(
          `Não existe projeto com o ID ${createAgregadoDto.projeto_id}`,
        );
      }

      data.projeto = {
        connect: { id: createAgregadoDto.projeto_id },
      };
    } else if (createAgregadoDto.estrategia_id) {
      const estrategia = await this.prisma.estrategia.findUnique({
        where: { id: createAgregadoDto.estrategia_id },
      });

      if (!estrategia) {
        throw new NotFoundException(
          `Não existe estrategia com o ID ${createAgregadoDto.estrategia_id}`,
        );
      }

      data.estrategia_has_agregado = {
        create: {
          ativado: createAgregadoDto.ativado,
          valor: createAgregadoDto.valor,
          variacoes: createAgregadoDto.variacoes,
          estrategia: {
            connect: { id: createAgregadoDto.estrategia_id },
          },
        },
      };
    }

    return await this.prisma.agregado.update({
      where: { id },
    }); */
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
