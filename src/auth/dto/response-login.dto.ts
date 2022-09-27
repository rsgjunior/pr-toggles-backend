import { ApiProperty } from '@nestjs/swagger';

export class ResponseLogin {
  @ApiProperty({ description: 'Token JWT da sessão' })
  access_token: string;
}
