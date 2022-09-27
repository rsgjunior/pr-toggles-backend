import { ApiProperty } from '@nestjs/swagger';

export class RequestLogin {
  @ApiProperty({ description: 'E-mail do usuário' })
  username: string;

  @ApiProperty({ description: 'Senha do usuário sem hash' })
  password: string;
}
