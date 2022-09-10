import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Injectable()
export class ProjetosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjetoDto: CreateProjetoDto) {
    const projeto = await this.prisma.projetos.create({
      data: createProjetoDto,
    });

    return projeto;
  }

  async findAll() {
    const projetos = await this.prisma.projetos.findMany({
      include: {
        clientes: {
          select: {
            clienteId: true
          }
        }
      }
    });

    return projetos;
  } 

  async findOne(id: number) {
    const projeto = await this.prisma.projetos.findUnique({
      where: {
        projetoId: id,
      },
    });

    return projeto;
  }

  async update(id: number, updateProjetoDto: UpdateProjetoDto) {
    const projeto = await this.prisma.projetos.update({
      where: {
        projetoId: id,
      },
      data: updateProjetoDto,
    });

    return projeto;
  }

  async remove(id: number) {
    return this.prisma.projetos.delete({
      where: {
        projetoId: id,
      },
    });
  }
}
