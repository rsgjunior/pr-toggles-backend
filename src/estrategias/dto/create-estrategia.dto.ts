import { ApiProperty } from '@nestjs/swagger';
import { estrategia_ambiente } from '@prisma/client';
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

  @IsEnum(estrategia_ambiente)
  @IsNotEmpty()
  ambiente: estrategia_ambiente;

  @IsOptional()
  valor?: string;

  @IsOptional()
  @IsJSON()
  variacoes?: string;
}
