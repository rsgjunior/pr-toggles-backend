import { Prisma } from '@prisma/client';

export class Projeto implements Prisma.ProjetoUncheckedCreateInput {
  id?: number;
  cliente_id: number;
  nome: string;
  descricao?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  ambientes?: Prisma.AmbienteUncheckedCreateNestedManyWithoutProjetoInput;
  funcionalidade_has_projeto_and_ambiente?: Prisma.FuncionalidadeHasProjetoAndAmbienteUncheckedCreateNestedManyWithoutProjetoInput;
}
