import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UsuarioTipo } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  cliente_id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MaxLength(128)
  @ApiProperty()
  email: string;

  @IsEnum(UsuarioTipo)
  @IsNotEmpty()
  @ApiProperty()
  tipo: UsuarioTipo;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  @ApiPropertyOptional()
  senha?: string;
}
