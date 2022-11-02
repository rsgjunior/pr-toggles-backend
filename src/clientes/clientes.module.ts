import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [ClientesController],
  providers: [ClientesService, PrismaService],
})
export class ClientesModule {}
