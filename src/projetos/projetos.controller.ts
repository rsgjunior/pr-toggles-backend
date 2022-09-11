import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjetosService } from './projetos.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('projetos')
@Controller('projetos')
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um projeto' })
  create(@Body() createProjetoDto: CreateProjetoDto) {
    return this.projetosService.create(createProjetoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter múltiplos projetos' })
  findAll() {
    return this.projetosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um único projeto' })
  findOne(@Param('id') id: string) {
    return this.projetosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um projeto' })
  update(@Param('id') id: string, @Body() updateProjetoDto: UpdateProjetoDto) {
    return this.projetosService.update(+id, updateProjetoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um projeto' })
  remove(@Param('id') id: string) {
    return this.projetosService.remove(+id);
  }
}
