import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstrategiasService } from './estrategias.service';
import { CreateEstrategiaDto } from './dto/create-estrategia.dto';
import { UpdateEstrategiaDto } from './dto/update-estrategia.dto';

@Controller('estrategias')
export class EstrategiasController {
  constructor(private readonly estrategiasService: EstrategiasService) {}

  @Post()
  create(@Body() createEstrategiaDto: CreateEstrategiaDto) {
    return this.estrategiasService.create(createEstrategiaDto);
  }

  @Get()
  findAll() {
    return this.estrategiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estrategiasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstrategiaDto: UpdateEstrategiaDto,
  ) {
    return this.estrategiasService.update(+id, updateEstrategiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estrategiasService.remove(+id);
  }
}
