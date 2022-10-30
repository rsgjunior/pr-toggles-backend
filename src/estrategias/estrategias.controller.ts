import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { EstrategiasService } from './estrategias.service';
import { UpdateEstrategiaDto } from './dto/update-estrategia.dto';
import { Ambientes } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('estrategias')
@ApiTags('estrategias')
export class EstrategiasController {
  constructor(private readonly estrategiasService: EstrategiasService) {}

  @Get('/funcionalidade/:funcionalidade_id/ambiente/:ambiente')
  findAllForFuncionalidadeInAmbiente(
    @Param('funcionalidade_id') funcionalidade_id: string,
    @Param('ambiente') ambiente: Ambientes,
  ) {
    return this.estrategiasService.findOneFiltered({
      where: {
        ambiente: ambiente,
        funcionalidade_id: +funcionalidade_id,
      },
      include: {
        estrategia_has_agregado: {
          include: {
            agregado: true,
          },
        },
        funcionalidade: true,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estrategiasService.findOneById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstrategiaDto: UpdateEstrategiaDto,
  ) {
    return this.estrategiasService.update(+id, updateEstrategiaDto);
  }
}
