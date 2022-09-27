import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProjetosModule } from './projetos/projetos.module';
import { FuncionalidadesModule } from './funcionalidades/funcionalidades.module';
import { RegrasModule } from './regras/regras.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    AuthModule,
    ClientesModule,
    ProjetosModule,
    FuncionalidadesModule,
    RegrasModule,
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
