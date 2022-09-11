import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProjetosModule } from './projetos/projetos.module';
import { FuncionalidadesModule } from './funcionalidades/funcionalidades.module';

@Module({
  imports: [AuthModule, UsersModule, ClientesModule, ProjetosModule, FuncionalidadesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
