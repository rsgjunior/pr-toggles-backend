import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChavesService } from './chaves.service';

@Controller('chaves')
@ApiTags('chaves')
export class ChavesController {
  constructor(private readonly chavesService: ChavesService) {}

  @Get('/projeto/:projeto_id')
  findAllForProjeto(@Param('projeto_id') projeto_id: string) {
    return this.chavesService.findMany({
      where: {
        projeto_id: +projeto_id,
      },
    });
  }
}
