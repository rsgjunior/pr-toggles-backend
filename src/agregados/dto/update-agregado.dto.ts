import { PartialType } from '@nestjs/swagger';
import { CreateAgregadoDto } from './create-agregado.dto';

export class UpdateAgregadoDto extends PartialType(CreateAgregadoDto) {}
