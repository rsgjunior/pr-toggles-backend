import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProjetosModule } from './projetos/projetos.module';
import { FuncionalidadesModule } from './funcionalidades/funcionalidades.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EstrategiasModule } from './estrategias/estrategias.module';
import { AgregadosModule } from './agregados/agregados.module';
import { RegrasModule } from './regras/regras.module';
import { ChavesModule } from './chaves/chaves.module';
import { VariacoesModule } from './variacoes/variacoes.module';

@Module({
  imports: [
    AuthModule,
    ClientesModule,
    ProjetosModule,
    FuncionalidadesModule,
    UsuariosModule,
    EstrategiasModule,
    AgregadosModule,
    RegrasModule,
    ChavesModule,
    VariacoesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
