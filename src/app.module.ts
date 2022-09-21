import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProjetosModule } from './projetos/projetos.module';
import { FuncionalidadesModule } from './funcionalidades/funcionalidades.module';
import { RegrasModule } from './regras/regras.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ClientesModule,
    ProjetosModule,
    FuncionalidadesModule,
    RegrasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
