import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class UpdateFuncionalidadeDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  nome?: string;

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
  @IsOptional()
  @ApiPropertyOptional()
  projeto_id?: number;
}
