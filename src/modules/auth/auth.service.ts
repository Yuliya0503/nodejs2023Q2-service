import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  async singUp(createUserDto: CreateUserDto) {
    console.log(createUserDto);
  }

  async logIn(loginUserDto: CreateUserDto) {
    console.log(loginUserDto);
  }

  async refreshToken(refreshToken: string) {
    console.log(refreshToken);
  }
}
