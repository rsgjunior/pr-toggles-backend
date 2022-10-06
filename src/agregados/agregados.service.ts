import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAgregadoDto } from './dto/create-agregado.dto';
import { UpdateAgregadoDto } from './dto/update-agregado.dto';

@Injectable()
export class AgregadosService {
  private readonly logger = new Logger(AgregadosService.name);

  constructor(private readonly prisma: PrismaService) {}

  create(createAgregadoDto: CreateAgregadoDto) {
    return 'This action adds a new agregado';
  }

  findAll() {
    return `This action returns all agregados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agregado`;
  }

  update(id: number, updateAgregadoDto: UpdateAgregadoDto) {
    return `This action updates a #${id} agregado`;
  }

  remove(id: number) {
    return `This action removes a #${id} agregado`;
  }
}
