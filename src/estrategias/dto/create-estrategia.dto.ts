import { ApiProperty } from '@nestjs/swagger';
import { Ambientes } from '@prisma/client';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateEstrategiaDto {
  @IsInt()
  @IsDefined()
  @ApiProperty({
    description: 'ID da funcionalidade que a estratégia pertence',
  })
  funcionalidade_id: number;

  @IsEnum(Ambientes)
  @IsNotEmpty()
  ambiente: Ambientes;

  @IsOptional()
  valor?: string;

  @IsOptional()
  @IsJSON()
  variacoes?: string;
}
