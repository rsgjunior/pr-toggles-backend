import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFuncionalidadeDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  descricao?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  ativada_prod?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  ativada_homolog?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  ativada_dev?: boolean;

  @IsInt()
  @ApiProperty({ description: 'ID do Projeto que a funcionalidade pertence' })
  projeto_id: number;

  @IsOptional()
  @ApiPropertyOptional()
  valor?: string;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional()
  variacoes?: object;
}
