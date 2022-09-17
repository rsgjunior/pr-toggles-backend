import { Prisma } from '@prisma/client';

export class Cliente implements Prisma.ClienteUncheckedCreateInput {
  id?: number;
  nome: string;
  descricao?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  projetos?: Prisma.ProjetoUncheckedCreateNestedManyWithoutClienteInput;
  usuarios?: Prisma.UsuarioUncheckedCreateNestedManyWithoutClienteInput;
}
