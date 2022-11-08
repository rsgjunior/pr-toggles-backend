import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AgregadoDeRegras } from 'src/regras/interfaces';

export class CreateAgregadoDto {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  projeto_id?: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  estrategia_id?: number;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  nome?: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  descricao?: string;

  @IsArray({ each: true })
  @ApiProperty()
  regras: AgregadoDeRegras;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  valor?: string;

  @IsOptional()
  @ApiPropertyOptional()
  variacoes?: object;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  ativado?: boolean;
}
