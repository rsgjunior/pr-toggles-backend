import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFuncionalidadeDto } from './dto/create-funcionalidade.dto';
import { UpdateFuncionalidadeDto } from './dto/update-funcionalidade.dto';

@Injectable()
export class FuncionalidadesService {
  constructor(private readonly prisma: PrismaService) { }

  create(createFuncionalidadeDto: CreateFuncionalidadeDto) {

    const funcionalidade = this.prisma.funcionalidades.create({
      data: createFuncionalidadeDto
    });

    return funcionalidade;
  }

  findAll() {
    return `This action returns all funcionalidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} funcionalidade`;
  }

  update(id: number, updateFuncionalidadeDto: UpdateFuncionalidadeDto) {
    return `This action updates a #${id} funcionalidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} funcionalidade`;
  }
}
