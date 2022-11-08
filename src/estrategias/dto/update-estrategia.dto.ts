import { PickType } from '@nestjs/swagger';
import { CreateEstrategiaDto } from './create-estrategia.dto';

export class UpdateEstrategiaDto extends PickType(CreateEstrategiaDto, [
  'valor',
  'variacoes',
] as const) {}
