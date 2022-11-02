import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { jwtPayload } from './interfaces';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, senha: string): Promise<Usuario | null> {
    this.logger.log('validateUser');

    const usuario = await this.prisma.usuario.findFirst({ where: { email } });

    if (usuario) {
      if (await bcrypt.compare(senha, usuario.senha)) {
        delete usuario.senha;
        return usuario;
      }
    }

    return null;
  }

  async login(usuario: Usuario) {
    this.logger.log('login');

    const payload: jwtPayload = {
      email: usuario.email,
      sub: usuario.id,
      name: usuario.nome,
      cliente_id: usuario.cliente_id,
    };

    const cliente = await this.prisma.cliente.findUnique({
      where: {
        id: usuario.cliente_id,
      },
      select: {
        nome: true,
      },
    });

    return {
      accessToken: this.jwtService.sign(payload),
      name: cliente.nome || null,
    };
  }
}
