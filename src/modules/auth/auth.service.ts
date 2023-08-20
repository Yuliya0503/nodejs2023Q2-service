import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcript from 'bcryptjs';
import { tokensObject } from '../../models/interfaces';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async setAndReturnToken(user): Promise<tokensObject> {
    const payLoad = { sub: user.id, username: user.login };
    const accessToken = await this.jwtService.signAsync(payLoad, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    const refreshToken = await this.jwtService.signAsync(payLoad, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
    const salt = Number(process.env.CRYPT_SALT);
    const hashedRefreshToken = await bcript.hash(refreshToken, salt);
    await this.userService.updateRefreshTokenById(user.id, hashedRefreshToken);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async singup(dto) {
    return await this.userService.create(dto);
  }

  async login(dto): Promise<AuthEntity> {
    const { login, password } = dto;
    const user = await this.userService.getUserByLogin(login);

    if (!user) {
      throw new NotFoundException('No user found');
    }

    const isPasswordValid = await bcript.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const tokens = await this.setAndReturnToken(user);
    return tokens;
  }

  async refreshToken(refreshToken: string) {
    const payload = this.jwtService.decode(refreshToken);
    if (!payload) {
      throw new ForbiddenException('Forbiden: empty payload');
    }
    const user = await this.userService.getUserById(payload.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      const secret = process.env.JWT_SECRET_REFRESH_KEY;
      await this.jwtService.verifyAsync(refreshToken, { secret: secret });
    } catch (error) {
      console.error(error);
      throw new ForbiddenException('secret');
    }
    return user;
  }
}
