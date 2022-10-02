import { PartialType } from '@nestjs/swagger';
import { CreateEstrategiaDto } from './create-estrategia.dto';

export class UpdateEstrategiaDto extends PartialType(CreateEstrategiaDto) {}
