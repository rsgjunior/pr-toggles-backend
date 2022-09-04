import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [AuthModule, UsersModule, ClienteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
