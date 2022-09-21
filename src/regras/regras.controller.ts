import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegrasService } from './regras.service';
import { CreateRegraDto } from './dto/create-regra.dto';
import { UpdateRegraDto } from './dto/update-regra.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('regras')
@Controller('regras')
export class RegrasController {
  constructor(private readonly regrasService: RegrasService) {}

  @Post()
  create(@Body() createRegraDto: CreateRegraDto) {
    return this.regrasService.create(createRegraDto);
  }

  @Get()
  findAll() {
    return this.regrasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regrasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegraDto: UpdateRegraDto) {
    return this.regrasService.update(+id, updateRegraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regrasService.remove(+id);
  }
}
