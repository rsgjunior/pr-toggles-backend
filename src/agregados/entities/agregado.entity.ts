import { Prisma } from '@prisma/client';

export class Agregado implements Prisma.AgregadoUncheckedCreateInput {
  id?: number;
  projeto_id?: number;
  nome: string;
  descricao?: string;
  regras?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  estrategia_has_agregado?: Prisma.EstrategiaHasAgregadoUncheckedCreateNestedManyWithoutAgregadoInput;
}
