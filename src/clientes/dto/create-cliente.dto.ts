import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  MaxLength,
} from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @ApiProperty()
  nome_cliente: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @ApiProperty()
  nome_usuario: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(128)
  @ApiProperty()
  email: string;

  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  @ApiProperty()
  senha: string;

  @IsString()
  @MaxLength(256)
  @IsNotEmpty()
  @ApiProperty()
  confirmacao_senha: string;

  @IsString()
  @IsOptional()
  @MaxLength(512)
  @ApiPropertyOptional()
  descricao?: string;
}
