import { Prisma } from "@prisma/client";

export class Funcionalidade implements Prisma.funcionalidadesUncheckedCreateInput {
  funcionalidadeId?: number;
  nome: string;
  descricao?: string;
  tipo?: string;
  ativada: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  estrategias?: Prisma.estrategiasUncheckedCreateNestedManyWithoutFuncionalidadesInput;
  funcionalidades_has_projetos_and_ambientes?: Prisma.funcionalidades_has_projetos_and_ambientesUncheckedCreateNestedManyWithoutFuncionalidadesInput;
}
