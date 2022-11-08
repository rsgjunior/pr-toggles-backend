import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
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
  @IsNotEmpty()
  @ApiPropertyOptional()
  descricao?: string;

  @IsArray({ each: true })
  @ApiProperty()
  regras: AgregadoDeRegras;
}
