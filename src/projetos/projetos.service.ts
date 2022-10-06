import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Injectable()
export class ProjetosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjetoDto: CreateProjetoDto) {
    const cliente = await this.prisma.cliente.findUnique({
      where: {
        id: createProjetoDto.cliente_id,
      },
    });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente de ID ${createProjetoDto.cliente_id} não existe.`,
      );
    }

    const projetoDoMesmoClienteComMesmoNome =
      await this.prisma.projeto.findFirst({
        where: {
          cliente_id: createProjetoDto.cliente_id,
          nome: createProjetoDto.nome,
        },
      });

    if (projetoDoMesmoClienteComMesmoNome) {
      throw new HttpException(
        'Já existe um projeto com o mesmo nome para esse cliente',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.projeto.create({
      data: createProjetoDto,
    });
  }

  async findMany(params: {
    where?: Prisma.ProjetoWhereInput;
    include?: Prisma.ProjetoInclude;
  }) {
    const { where, include } = params;
    return this.prisma.projeto.findMany({
      where,
      include,
    });
  }

  async findOne(id: number) {
    const projeto = await this.prisma.projeto.findUnique({
      where: { id },
    });

    if (!projeto) {
      throw new NotFoundException(`Não existe projeto com o ID ${id}`);
    }

    return projeto;
  }

  async update(id: number, updateProjetoDto: UpdateProjetoDto) {
    const projeto = await this.prisma.projeto.findUnique({
      where: { id },
    });

    if (!projeto) {
      throw new NotFoundException(`Não existe projeto com o ID ${id}`);
    }

    return this.prisma.projeto.update({
      where: { id },
      data: updateProjetoDto,
    });
  }

  async remove(id: number) {
    const projeto = await this.prisma.projeto.findUnique({
      where: { id },
    });

    if (!projeto) {
      throw new NotFoundException(`Não existe projeto com o ID ${id}`);
    }

    return this.prisma.projeto.delete({
      where: { id },
    });
  }
}
