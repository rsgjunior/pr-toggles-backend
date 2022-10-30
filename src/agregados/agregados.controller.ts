import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AgregadosService } from './agregados.service';
import { CreateAgregadoDto } from './dto/create-agregado.dto';
import { UpdateAgregadoDto } from './dto/update-agregado.dto';

@Controller('agregados')
@ApiTags('agregados')
export class AgregadosController {
  constructor(private readonly agregadosService: AgregadosService) {}

  @Post()
  create(@Body() createAgregadoDto: CreateAgregadoDto) {
    return this.agregadosService.create(createAgregadoDto);
  }

  @Get('/estrategia/:estrategia_id')
  findAllForEstrategia(@Param('estrategia_id') estrategia_id: string) {
    return this.agregadosService.findMany({
      include: {
        estrategia_has_agregado: {
          where: {
            estrategia_id: +estrategia_id,
          },
        },
      },
    });
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
