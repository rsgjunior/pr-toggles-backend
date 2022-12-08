import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { AgregadoDeRegras } from 'src/regras/interfaces';

export class CreateAgregadoDto {
  @IsPositive()
  @IsInt()
  @ApiProperty()
  projeto_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  descricao?: string;

  @IsArray({ each: true })
  @ApiProperty()
  regras: AgregadoDeRegras;
}
