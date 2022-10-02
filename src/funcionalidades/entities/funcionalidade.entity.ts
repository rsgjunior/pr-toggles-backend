import { Prisma } from '@prisma/client';

export class Funcionalidade
  implements Prisma.FuncionalidadeUncheckedCreateInput
{
  id?: number;
  projeto_id: number;
  nome: string;
  descricao?: string;
  ativada_prod?: boolean;
  ativada_homolog?: boolean;
  ativada_dev?: boolean;
  created_at?: string | Date;
  updated_at?: string | Date;
  estrategias?: Prisma.EstrategiaUncheckedCreateNestedManyWithoutFuncionalidadeInput;
}
