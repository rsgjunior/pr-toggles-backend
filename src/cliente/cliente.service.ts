import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

  create(createClienteDto: CreateClienteDto) {
    return this.prisma.clientes.create({
      data: createClienteDto,
    });
  }

  findAll() {
    return this.prisma.clientes.findMany();
  }

  findOne(id: number) {
    return this.prisma.clientes.findUnique({
      where: {
        clienteId: id,
      },
    });
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.prisma.clientes.update({
      where: {
        clienteId: id,
      },
      data: updateClienteDto,
    });
  }

  remove(id: number) {
    return this.prisma.clientes.delete({
      where: {
        clienteId: id,
      },
    });
  }
}
