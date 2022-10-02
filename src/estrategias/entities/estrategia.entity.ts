import { estrategia_ambiente, Prisma } from '@prisma/client';

export class Estrategia implements Prisma.EstrategiaUncheckedCreateInput {
  id?: number;
  funcionalidade_id: number;
  ambiente: estrategia_ambiente;
  valor?: string;
  variacoes?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  estrategia_has_agregado?: Prisma.EstrategiaHasAgregadoUncheckedCreateNestedManyWithoutEstrategiaInput;
}
