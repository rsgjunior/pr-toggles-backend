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

  @IsNumber()
  @Max(1)
  @Min(0)
  @ApiProperty({ description: '0 - false / 1 - true' })
  ativada: number;
}
