import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFuncionalidadeDto } from './dto/create-funcionalidade.dto';
import { UpdateFuncionalidadeDto } from './dto/update-funcionalidade.dto';

@Injectable()
export class FuncionalidadesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFuncionalidadeDto: CreateFuncionalidadeDto) {
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

    return this.prisma.funcionalidade.create({
      data: createFuncionalidadeDto,
    });
  }

  async findAll() {
    return this.prisma.funcionalidade.findMany();
  }

  async findOne(id: number) {
    const funcionalidade = await this.prisma.funcionalidade.findUnique({
      where: { id },
    });

    if (!funcionalidade) {
      throw new NotFoundException(`Não existe funcionalidade com o ID ${id}`);
    }

    return funcionalidade;
  }

  async update(id: number, updateFuncionalidadeDto: UpdateFuncionalidadeDto) {
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
