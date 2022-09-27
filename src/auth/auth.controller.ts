import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RequestLogin } from './dto/request-login.dto';
import { ResponseLogin } from './dto/response-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: RequestLogin,
  })
  @ApiResponse({ status: 401, description: 'Usuário ou senha incorretos' })
  @ApiResponse({ status: 201, description: 'Success', type: ResponseLogin })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
