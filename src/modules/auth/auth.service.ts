import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  IUser,
  IUserNotPass,
  loginDto,
  signupDto,
  tokensObject,
} from '../../models/interfaces';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async setAndReturnToken(user: IUserNotPass): Promise<tokensObject> {
    const payLoad: { sub: string; username: string } = {
      sub: user.id,
      username: user.login,
    };
    const accessToken: string = await this.jwtService.signAsync(payLoad, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    const refreshToken: string = await this.jwtService.signAsync(payLoad, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
    const salt = Number(process.env.CRYPT_SALT);
    const hashedRefreshToken: string = await bcrypt.hash(refreshToken, salt);
    await this.userService.updateRefreshTokenById(user.id, hashedRefreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(dto: signupDto): Promise<IUserNotPass> {
    return await this.userService.create(dto);
  }

  async login(dto: loginDto): Promise<AuthEntity> {
    const { login, password } = dto;
    const user: IUser = await this.userService.getUserByLogin(login);

    if (!user) {
      throw new NotFoundException('No user found');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const tokens: tokensObject = await this.setAndReturnToken(user);
    return tokens;
  }

  async refreshToken(refreshToken: string): Promise<IUserNotPass> {
    const payload = this.jwtService.decode(refreshToken);
    if (!payload) {
      throw new ForbiddenException('Forbidden: empty payload');
    }

    const user: IUserNotPass = await this.userService.getUserById(payload.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      const secret: string = process.env.JWT_SECRET_REFRESH_KEY;
      await this.jwtService.verifyAsync(refreshToken, { secret });
    } catch (error) {
      console.error(error);
      throw new ForbiddenException('Invalid refresh token');
    }

    return user;
  }
}
