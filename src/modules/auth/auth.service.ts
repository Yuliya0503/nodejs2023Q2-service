import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async singUp(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const user = await this.userService.create({
      login,
      password,
    });
    return {
      message: 'User registered successfully',
      id: user.id,
      user,
    };
  }

  async logIn(loginUserDto: CreateUserDto) {
    const { login, password } = loginUserDto;
    const user = await this.userService.getUserByLogin(login);
    const validatorPassword = await compare(password, user.password);

    if (!user || !validatorPassword) {
      throw new ForbiddenException('Invalid credentials');
    }
  }

  async refreshToken(refreshToken: string) {
    console.log(refreshToken);
  }
}
