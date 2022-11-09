import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOrUpdateEstrategiaHasAgregadoDto {
  @IsInt()
  @IsPositive()
  @ApiProperty()
  @IsDefined()
  agregado_id: number;

  @IsInt()
  @IsPositive()
  @ApiProperty()
  @IsDefined()
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
