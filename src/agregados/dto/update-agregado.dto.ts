import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { AgregadoDeRegras } from 'src/regras/interfaces';

export class UpdateAgregadoDto {
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
  regras?: AgregadoDeRegras | string;
}
