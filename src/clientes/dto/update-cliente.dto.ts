import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateClienteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @ApiProperty()
  nome: string;

  @IsString()
  @IsOptional()
  @MaxLength(512)
  @ApiPropertyOptional()
  descricao?: string;
}
