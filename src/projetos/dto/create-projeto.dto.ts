import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Projeto } from '../entities/projeto.entity';

export class CreateProjetoDto extends Projeto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNumber()
  clientes_clienteId: number;
}
