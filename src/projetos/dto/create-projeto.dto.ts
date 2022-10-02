import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProjetoDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  descricao?: string;

  @IsInt()
  @ApiProperty({ description: 'ID do cliente que o projeto pertence' })
  cliente_id: number;
}
