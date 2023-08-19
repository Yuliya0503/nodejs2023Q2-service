import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import AuthConst from 'src/models/authConst';
import {
  InvalidCredentialsException,
  RefreshTokenMissingException,
  InvalidRefreshTokenException,
} from 'src/helpers/exeptions';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken(
    payload: Record<string, any>,
    expiresIn: string,
  ): string {
    return this.jwtService.sign(payload, { expiresIn });
  }

  private async validateUserAndPass(
    login: string,
    password: string,
  ): Promise<User> {
    const user = await this.userService.getUserByLogin(login);
    if (!user || !(await compare(password, user.password))) {
      throw new InvalidCredentialsException();
    }
    return user;
  }

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
    const user = await this.validateUserAndPass(login, password);

    const accessToken = this.generateToken(
      { userId: user.id, login: user.login },
      AuthConst.TOKEN_EXPIRE_TIME,
    );
    const refreshToken = this.generateToken(
      { userId: user.id, login: user.login },
      AuthConst.TOKEN_REFRESH_EXPIRE_TIME,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new RefreshTokenMissingException();
    }
    try {
      const result = await this.jwtService.verify(refreshToken);
      if (Math.round(Date.now() / 1000) - result.exp < 0) {
        const payload = { login: result.login, userId: result.userId };
        return {
          accessToken: this.generateToken(payload, AuthConst.TOKEN_EXPIRE_TIME),
          refreshToken: this.generateToken(
            payload,
            AuthConst.TOKEN_REFRESH_EXPIRE_TIME,
          ),
        };
      }
    } catch (error) {
      throw new InvalidRefreshTokenException();
    }
  }

  async validatorUser(login: string, password: string) {
    const user = await this.validateUserAndPass(login, password);
    const result = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return result;
  }
}
