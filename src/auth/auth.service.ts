import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { jwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.usuariosService.findOneByEmail(email);
    if (usuario) {
      if (await bcrypt.compare(senha, usuario.senha)) {
        delete usuario.senha;
        return usuario;
      }
    }
    return null;
  }

  async login(usuario: Usuario) {
    const payload: jwtPayload = {
      email: usuario.email,
      sub: usuario.id,
      name: usuario.nome,
      cliente_id: usuario.cliente_id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
