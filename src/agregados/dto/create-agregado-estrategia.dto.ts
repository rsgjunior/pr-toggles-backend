import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAgregadoForEstrategiaDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  nome?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  descricao?: string;

  @IsArray({ each: true })
  @IsOptional()
  @ApiPropertyOptional()
  regras?: string;
}
