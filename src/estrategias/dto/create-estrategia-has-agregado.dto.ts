import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateEstrategiaHasAgregadoDto {
  @IsInt()
  @IsPositive()
  @ApiProperty()
  agregado_id: number;

  @IsInt()
  @IsPositive()
  @ApiProperty()
  estrategia_id: number;

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
