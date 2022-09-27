import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Usuario> {
    const usuario = await this.authService.validateUser(username, password);
    if (!usuario) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }
    return usuario;
  }
}
