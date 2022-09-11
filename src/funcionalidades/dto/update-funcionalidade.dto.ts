import { PartialType } from '@nestjs/swagger';
import { CreateFuncionalidadeDto } from './create-funcionalidade.dto';

export class UpdateFuncionalidadeDto extends PartialType(CreateFuncionalidadeDto) {}
