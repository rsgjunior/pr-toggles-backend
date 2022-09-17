import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Injectable()
export class ProjetosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjetoDto: CreateProjetoDto) {
    const cliente = await this.prisma.clientes.findUnique({
      where: {
        clienteId: createProjetoDto.clientes_clienteId
      }
    });

    if(!cliente) {
      throw new NotFoundException(`Cliente de ID ${createProjetoDto.clientes_clienteId} não existe.`);
    }

    const projeto = await this.prisma.projetos.findFirst({
      where: {
        clientes_clienteId: createProjetoDto.clientes_clienteId,
        nome: createProjetoDto.nome
      }
    });

    if(projeto) {
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

    return this.prisma.projetos.create({
      data: createProjetoDto,
      include: {
        ambientes: true
      }
    });
  }

  async findAll() {
    return this.prisma.projetos.findMany({
      include: {
        clientes: {
          select: {
            clienteId: true
          }
        },
        ambientes: true
      }
    });
  } 

  async findOne(id: number) {
    const projeto = await this.prisma.projetos.findUnique({
      where: {
        projetoId: id,
      },
    });

    if(!projeto) {
      throw new NotFoundException();
    }

    return projeto;
  }

  async update(id: number, updateProjetoDto: UpdateProjetoDto) {
    const projeto = await this.prisma.projetos.findUnique({
      where: {
        projetoId: id
      }
    });

    if(!projeto) {
      throw new NotFoundException();
    }

    return this.prisma.projetos.update({
      where: {
        projetoId: id,
      },
      data: updateProjetoDto,
    });
  }

  async remove(id: number) {
    const projeto = await this.prisma.projetos.findUnique({
      where: {
        projetoId: id
      }
    });

    if(!projeto) {
      throw new NotFoundException();
    }

    return this.prisma.projetos.delete({
      where: {
        projetoId: id,
      },
    });
  }
}
