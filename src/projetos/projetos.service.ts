import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Injectable()
export class ProjetosService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProjetoDto: CreateProjetoDto) {
    const cliente = await this.prisma.cliente.findUnique({
      where: {
        id: createProjetoDto.cliente_id
      }
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente de ID ${createProjetoDto.cliente_id} não existe.`);
    }

    const projeto = await this.prisma.projeto.findFirst({
      where: {
        cliente_id: createProjetoDto.cliente_id,
        nome: createProjetoDto.nome
      }
    });

    if (projeto) {
      throw new HttpException('Já existe um projeto com o mesmo nome para esse cliente', HttpStatus.BAD_REQUEST);
    }

    // Criando os ambientes padrões
    if (!createProjetoDto.ambientes) {
      createProjetoDto.ambientes = {
        create: [
          { nome: 'Produção' },
          { nome: 'Teste' },
          { nome: 'Desenvolvimento' },
        ]
      };
    }

    return this.prisma.projeto.create({
      data: createProjetoDto,
      include: {
        ambientes: true
      }
    });
  }

  async findAll() {
    return this.prisma.projeto.findMany({
      include: {
        cliente: {
          select: {
            id: true
          }
        },
        ambientes: true
      }
    });
  }

  async findOne(id: number) {
    const projeto = await this.prisma.projeto.findUnique({
      where: { id },
    });

    if (!projeto) {
      throw new NotFoundException();
    }

    return projeto;
  }

  async update(id: number, updateProjetoDto: UpdateProjetoDto) {
    const projeto = await this.prisma.projeto.findUnique({
      where: { id }
    });

    if (!projeto) {
      throw new NotFoundException();
    }

    return this.prisma.projeto.update({
      where: { id },
      data: updateProjetoDto,
    });
  }

  async remove(id: number) {
    const projeto = await this.prisma.projeto.findUnique({
      where: { id }
    });

    if (!projeto) {
      throw new NotFoundException();
    }

    return this.prisma.projeto.delete({
      where: { id },
    });
  }
}
