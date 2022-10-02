import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProjetosModule } from './projetos/projetos.module';
import { FuncionalidadesModule } from './funcionalidades/funcionalidades.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EstrategiasModule } from './estrategias/estrategias.module';

@Module({
  imports: [
    AuthModule,
    ClientesModule,
    ProjetosModule,
    FuncionalidadesModule,
    UsuariosModule,
    EstrategiasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
