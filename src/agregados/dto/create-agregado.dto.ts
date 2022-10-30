import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAgregadoDto {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  projeto_id?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  descricao?: string;

  @IsArray({ each: true })
  @IsOptional()
  @ApiPropertyOptional()
  regras?: string;

  @IsOptional()
  @ApiPropertyOptional()
  estrategia_has_agregado?: Prisma.EstrategiaHasAgregadoUncheckedCreateNestedManyWithoutAgregadoInput;
}
