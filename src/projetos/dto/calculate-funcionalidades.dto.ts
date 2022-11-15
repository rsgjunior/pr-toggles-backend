import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CalculateFuncionalidadesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  chave_ambiente: string;

  @IsDefined()
  @IsObject()
  @ApiProperty()
  contexto: object;
}
