import { Prisma } from '@prisma/client';

export class Funcionalidade
  implements Prisma.FuncionalidadeUncheckedCreateInput
{
  id?: number;
  nome: string;
  descricao?: string;
  tipo?: string;
  ativada?: boolean;
  created_at?: string | Date;
  updated_at?: string | Date;
  estrategias?: Prisma.EstrategiaUncheckedCreateNestedManyWithoutFuncionalidadeInput;
  funcionalidade_has_projeto_and_ambiente?: Prisma.FuncionalidadeHasProjetoAndAmbienteUncheckedCreateNestedManyWithoutFuncionalidadeInput;
}
