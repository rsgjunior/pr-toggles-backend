import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegraDto } from './dto/create-regra.dto';
import { UpdateRegraDto } from './dto/update-regra.dto';

@Injectable()
export class RegrasService {
  constructor(private readonly prisma: PrismaService) { }

  create(createRegraDto: CreateRegraDto) {
    return 'This action adds a new regra';
  }

  findAll() {
    return `This action returns all regras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} regra`;
  }

  update(id: number, updateRegraDto: UpdateRegraDto) {
    return `This action updates a #${id} regra`;
  }

  remove(id: number) {
    return `This action removes a #${id} regra`;
  }
}
