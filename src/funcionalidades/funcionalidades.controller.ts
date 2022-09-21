import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { FuncionalidadesService } from './funcionalidades.service';
import { CreateFuncionalidadeDto } from './dto/create-funcionalidade.dto';
import { UpdateFuncionalidadeDto } from './dto/update-funcionalidade.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('funcionalidades')
@Controller('funcionalidades')
export class FuncionalidadesController {
  constructor(
    private readonly funcionalidadesService: FuncionalidadesService,
  ) {}

  @Post()
  create(@Body() createFuncionalidadeDto: CreateFuncionalidadeDto) {
    return this.funcionalidadesService.create(createFuncionalidadeDto);
  }

  @Get()
  findAll() {
    return this.funcionalidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcionalidadesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFuncionalidadeDto: UpdateFuncionalidadeDto,
  ) {
    return this.funcionalidadesService.update(+id, updateFuncionalidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcionalidadesService.remove(+id);
  }
}
