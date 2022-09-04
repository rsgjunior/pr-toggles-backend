import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { Cliente } from '../entities/cliente.entity';

export class CreateClienteDto extends Cliente {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string | null;
}
