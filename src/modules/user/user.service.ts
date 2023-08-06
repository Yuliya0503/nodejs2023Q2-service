import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { valodatorId, validatorPassAndLogin } from '../../helpers/validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async create(CreateUserDto: CreateUserDto) {
    const newUser: User = {
      id: v4(),
      login: CreateUserDto.login,
      password: CreateUserDto.password,
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
    if (user.password !== oldPassword) {
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
    }
    const newDataUser = {
      ...user,
      password: newPassword,
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
}
