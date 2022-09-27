import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const cliente = await this.prisma.cliente.findUnique({
      where: {
        id: createUsuarioDto.cliente_id,
      },
    });

    if (!cliente) {
      throw new NotFoundException(
        `Não existe cliente com o ID ${createUsuarioDto.cliente_id}`,
      );
    }

    if (createUsuarioDto.senha) {
      createUsuarioDto.senha = await bcrypt.hash(createUsuarioDto.senha, 10);
    }

    return this.prisma.usuario.create({
      data: createUsuarioDto,
      include: {
        cliente: true,
      },
    });
  }

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      include: {
        cliente: true,
      },
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.usuario.findFirst({
      where: { email },
      include: {
        cliente: true,
      },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException(`Não existe usuário com o ID ${id}`);
    }

    return this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException(`Não existe usuário com o ID ${id}`);
    }

    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
