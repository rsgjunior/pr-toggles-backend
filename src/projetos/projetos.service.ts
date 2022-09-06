import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Injectable()
export class ProjetosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProjetoDto: CreateProjetoDto) {
    return this.prisma.projetos.create({
      data: createProjetoDto,
    });
  }

  findAll() {
    return this.prisma.projetos.findMany();
  }

  findOne(id: number) {
    return this.prisma.projetos.findUnique({
      where: {
        projetoId: id,
      },
    });
  }

  update(id: number, updateProjetoDto: UpdateProjetoDto) {
    return this.prisma.projetos.update({
      where: {
        projetoId: id,
      },
      data: updateProjetoDto,
    });
  }

  remove(id: number) {
    return this.prisma.projetos.delete({
      where: {
        projetoId: id,
      },
    });
  }
}
