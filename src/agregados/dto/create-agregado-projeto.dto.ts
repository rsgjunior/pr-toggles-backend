import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateAgregadoForProjetoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  descricao?: string;

  @IsArray({ each: true })
  @ApiProperty()
  regras: string;
}
