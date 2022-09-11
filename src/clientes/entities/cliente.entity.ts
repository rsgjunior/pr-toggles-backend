import { Prisma } from '@prisma/client';

export class Cliente implements Prisma.clientesUncheckedCreateInput {
  clienteId?: number;
  nome: string;
  descricao?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  projetos?: Prisma.projetosUncheckedCreateNestedManyWithoutClientesInput;
  usuarios?: Prisma.usuariosUncheckedCreateNestedManyWithoutClientesInput;
}
