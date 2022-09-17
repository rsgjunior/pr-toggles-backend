import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateFuncionalidadeDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  tipo?: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  ativada?: boolean;

  @IsNumber()
  @ApiProperty({ description: 'ID do Projeto que a funcionalidade pertence' })
  projeto_id: number;
}
