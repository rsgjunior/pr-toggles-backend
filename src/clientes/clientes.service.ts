import {
  Injectable,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ClientesService {
  private readonly logger = new Logger(ClientesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    this.logger.log('create');

    if (createClienteDto.senha !== createClienteDto.confirmacao_senha) {
      throw new BadRequestException(
        'A confirmação da senha é diferente da senha inserida',
      );
    }

    const usuarioComMesmoEmail = await this.prisma.usuario.findFirst({
      where: {
        email: createClienteDto.email,
      },
    });

    if (usuarioComMesmoEmail) {
      throw new ConflictException(
        `Já existe um usuário com o email ${createClienteDto.email}`,
      );
    }

    const hashSenha = await bcrypt.hash(createClienteDto.senha, 10);

    const data: Prisma.ClienteCreateInput = {
      nome: createClienteDto.nome_cliente,
      descricao: createClienteDto.descricao,
      usuarios: {
        create: {
          email: createClienteDto.email,
          nome: createClienteDto.nome_usuario,
          senha: hashSenha,
          tipo: 'Administrador',
        },
      },
    };

    const cliente = await this.prisma.cliente.create({
      data,
      include: {
        usuarios: true,
      },
    });

    const usuario = cliente.usuarios[0];

    return await this.authService.login(usuario);
  }

  async findAll() {
    return this.prisma.cliente.findMany();
  }

  async findOne(id: number) {
    return this.prisma.cliente.findUnique({ where: { id } });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  async remove(id: number) {
    return this.prisma.cliente.delete({
      where: { id },
    });
  }
}
