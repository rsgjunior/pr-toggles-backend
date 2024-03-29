import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFuncionalidadeDto } from './dto/create-funcionalidade.dto';
import { UpdateFuncionalidadeDto } from './dto/update-funcionalidade.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FuncionalidadesService {
  private readonly logger = new Logger(FuncionalidadesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createFuncionalidadeDto: CreateFuncionalidadeDto) {
    this.logger.log('create');

    // Verifica se o projeto existe
    const projeto = await this.prisma.projeto.findUnique({
      where: {
        id: createFuncionalidadeDto.projeto_id,
      },
    });

    if (!projeto) {
      throw new NotFoundException(
        `Não existe projeto com o ID ${createFuncionalidadeDto.projeto_id}`,
      );
    }

    // Verifica se já existe uma funcionalidade com o mesmo nome para esse projeto
    const funcionalidadeComMesmoNomeNoProjeto =
      await this.prisma.funcionalidade.findFirst({
        where: {
          nome: createFuncionalidadeDto.nome,
          projeto_id: createFuncionalidadeDto.projeto_id,
        },
      });

    if (funcionalidadeComMesmoNomeNoProjeto) {
      throw new BadRequestException(
        `Já existe uma funcionalidade com o nome '${createFuncionalidadeDto.nome}' para este projeto`,
      );
    }

    const { projeto_id, valor, variacoes } = createFuncionalidadeDto;

    delete createFuncionalidadeDto.projeto_id;
    delete createFuncionalidadeDto.valor;
    delete createFuncionalidadeDto.variacoes;

    const data: Prisma.FuncionalidadeCreateInput = {
      ...createFuncionalidadeDto,
      salt: uuidv4().substring(0, 3),
      projeto: {
        connect: {
          id: projeto_id,
        },
      },
      estrategias: {
        createMany: {
          data: [
            { ambiente: 'dev', valor, variacoes },
            { ambiente: 'homolog', valor, variacoes },
            { ambiente: 'prod', valor, variacoes },
          ],
        },
      },
    };

    return this.prisma.funcionalidade.create({
      data,
      include: {
        estrategias: true,
      },
    });
  }

  async findMany(params: {
    where?: Prisma.FuncionalidadeWhereInput;
    include?: Prisma.FuncionalidadeInclude;
  }) {
    this.logger.log('findMany');

    const { where, include } = params;

    // Se veio um projeto_id no payload verifica se ele existe
    if ('projeto_id' in where) {
      const projeto = await this.prisma.projeto.findUnique({
        where: {
          id: +where.projeto_id,
        },
      });

      if (!projeto) {
        throw new NotFoundException(
          `Não existe projeto com o ID ${where.projeto_id}`,
        );
      }
    }

    return await this.prisma.funcionalidade.findMany({
      where,
      include,
    });
  }

  async findOne(id: number) {
    this.logger.log('findOne');

    const funcionalidade = await this.prisma.funcionalidade.findUnique({
      where: { id },
    });

    if (!funcionalidade) {
      throw new NotFoundException(`Não existe funcionalidade com o ID ${id}`);
    }

    return funcionalidade;
  }

  async update(id: number, updateFuncionalidadeDto: UpdateFuncionalidadeDto) {
    this.logger.log('update');

    const funcionalidade = await this.prisma.funcionalidade.findUnique({
      where: { id },
    });

    if (!funcionalidade) {
      throw new NotFoundException(`Não existe funcionalidade com o ID ${id}`);
    }

    return this.prisma.funcionalidade.update({
      data: updateFuncionalidadeDto,
      where: { id },
    });
  }

  async remove(id: number) {
    this.logger.log('remove');

    const funcionalidade = await this.prisma.funcionalidade.findUnique({
      where: { id },
    });

    if (!funcionalidade) {
      throw new NotFoundException(`Não existe funcionalidade com o ID ${id}`);
    }

    return this.prisma.funcionalidade.delete({
      where: { id },
    });
  }
}
