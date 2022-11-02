import { ApiProperty } from '@nestjs/swagger';

export class ResponseLogin {
  @ApiProperty({ description: 'Token JWT da sessão' })
  accessToken: string;

  @ApiProperty({ description: 'Nome do cliente que o usuário está ligado' })
  name: string;
}
