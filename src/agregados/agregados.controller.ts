import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AgregadosService } from './agregados.service';
import { CreateAgregadoDto } from './dto/create-agregado.dto';
import { UpdateAgregadoDto } from './dto/update-agregado.dto';

@Controller('agregados')
export class AgregadosController {
  constructor(private readonly agregadosService: AgregadosService) {}

  @Post()
  create(@Body() createAgregadoDto: CreateAgregadoDto) {
    return this.agregadosService.create(createAgregadoDto);
  }

  @Get()
  findAll() {
    return this.agregadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agregadosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAgregadoDto: UpdateAgregadoDto,
  ) {
    return this.agregadosService.update(+id, updateAgregadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agregadosService.remove(+id);
  }
}
