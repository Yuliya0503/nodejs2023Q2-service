import {
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
  Body,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/decorators';
import { loginDto, refreshDto, signupDto } from '../../models/interfaces';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  @HttpCode(201)
  async singup(@Body() dto: signupDto) {
    return await this.authService.singup(dto);
  }

  @Public()
  @Post('/login')
  @HttpCode(200)
  async login(@Body() dto: loginDto) {
    return await this.authService.login(dto);
  }

  @Post('/refresh')
  @HttpCode(200)
  async refresh(@Body() dto: refreshDto) {
    try {
      const user = await this.authService.refreshToken(dto.refreshToken);
      return await this.authService.setAndReturnToken(user);
    } catch (error) {
      throw new ForbiddenException('Forbidden: user refresh');
    }
  }
}
