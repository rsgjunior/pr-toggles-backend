import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class Cliente implements Prisma.clientesUncheckedCreateInput {

  @ApiPropertyOptional()
  clienteId?: number;

  @ApiProperty()
  nome: string;

  @ApiPropertyOptional()
  descricao?: string;

  @ApiPropertyOptional()
  createdAt?: string | Date;

  @ApiPropertyOptional()
  updatedAt?: string | Date;

  @ApiPropertyOptional()
  projetos?: Prisma.projetosUncheckedCreateNestedManyWithoutClientesInput;

  @ApiPropertyOptional()
  usuarios?: Prisma.usuariosUncheckedCreateNestedManyWithoutClientesInput;

}
