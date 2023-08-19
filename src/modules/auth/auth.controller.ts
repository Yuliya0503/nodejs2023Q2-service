import { Controller, Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  singUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.singUp(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() loginUserDto: CreateUserDto) {
    return this.authService.logIn(loginUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
