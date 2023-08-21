import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { valodatorId, validatorPassAndLogin } from '../../helpers/validator';
import { PrismaClient } from '@prisma/client';
import * as bcript from 'bcryptjs';

const prisma = new PrismaClient();
export const roundsOfHashing = 10;

@Injectable()
export class UserService {
  async create(CreateUserDto: CreateUserDto) {
    const hashedPassword = await bcript.hash(
      CreateUserDto.password,
      roundsOfHashing,
    );
    const newUser: User = {
      id: v4(),
      login: CreateUserDto.login,
      password: hashedPassword,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    validatorPassAndLogin(newUser.password, newUser.login);
    await prisma.user.create({ data: newUser });
    const userWithNotPassword = {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
    return userWithNotPassword;
  }

  async getUsers() {
    const users = await prisma.user.findMany();
    const res = users.map(({ id, login, version, createdAt, updatedAt }) => {
      return { id, login, version, createdAt, updatedAt };
    });
    return res;
  }

  async getUserById(id: string) {
    valodatorId(id);
    const user = await prisma.user.findFirst({ where: { id: id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const userWithNotPassword = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userWithNotPassword;
  }

  async getUserByLogin(login: string) {
    if (!login) throw new BadRequestException('Invalid login!');
    if (!(await prisma.user.findFirst({ where: { login: login } })))
      throw new NotFoundException('User not found');

    return await prisma.user.findFirst({
      where: {
        login: login,
      },
    });
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    if (!oldPassword || !newPassword) {
      throw new HttpException(
        'Bad request. userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    valodatorId(id);
    const user = await prisma.user.findFirst({ where: { id: id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const passwordIsValid = await bcript.compare(oldPassword, user.password);
    if (!passwordIsValid) {
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
    }
    const updatePass = await bcript.hash(newPassword, roundsOfHashing);
    const newDataUser = {
      ...user,
      password: updatePass,
      updatedAt: Date.now(),
      version: (user.version += 1),
    };
    await prisma.user.update({
      where: {
        id: id,
      },
      data: newDataUser,
    });
    delete newDataUser.password;
    return newDataUser;
  }

  async remove(id: string) {
    valodatorId(id);
    const user = await prisma.user.findFirst({ where: { id: id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return await prisma.user.delete({ where: { id: id } });
  }

  async updateRefreshTokenById(id: string, refreshToken: string) {
    try {
      await prisma.user.update({
        where: { id: id },
        data: {
          refreshToken: refreshToken,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
