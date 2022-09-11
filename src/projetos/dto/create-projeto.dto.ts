import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjetoDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  descricao?: string;

  @IsNumber()
  @ApiProperty({ description: 'ID do cliente que o projeto pertence' })
  clientes_clienteId: number;

  @IsOptional()
  ambientes?: Prisma.ambientesUncheckedCreateNestedManyWithoutProjetosInput;
}
