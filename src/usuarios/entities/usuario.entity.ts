import { Prisma, UsuarioTipo } from '@prisma/client';

export class Usuario implements Prisma.UsuarioUncheckedCreateInput {
  id?: number;
  cliente_id: number;
  nome: string;
  email: string;
  tipo: UsuarioTipo;
  senha?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
}
