import { Prisma } from '@prisma/client';

export class Projeto implements Prisma.projetosUncheckedCreateInput {
  projetoId?: number;
  nome: string;
  descricao?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  clientes_clienteId: number;
  ambientes?: Prisma.ambientesUncheckedCreateNestedManyWithoutProjetosInput;
  funcionalidades_has_projetos_and_ambientes?: Prisma.funcionalidades_has_projetos_and_ambientesUncheckedCreateNestedManyWithoutProjetosInput;
}
