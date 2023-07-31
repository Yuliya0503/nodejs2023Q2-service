import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';
import { mockUsers } from 'src/db/db';
import { UpdateUserDto } from './dto/update-user.dto';
import { valodatorId, validatorPassAndLogin } from '../../helpers/validator';

@Injectable()
export class UserService {
  public create(CreateUserDto: CreateUserDto) {
    const newUser: User = {
      id: v4(),
      login: CreateUserDto.login,
      password: CreateUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    mockUsers.push(newUser);
    validatorPassAndLogin(newUser.password, newUser.login);
    const userWithNotPassword = {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return userWithNotPassword;
  }

  public getUsers() {
    const users = mockUsers.map(
      ({ id, login, version, createdAt, updatedAt }) => {
        return { id, login, version, createdAt, updatedAt };
      },
    );
    return users;
  }

  public getUserById(id: string) {
    valodatorId(id);
    const user = mockUsers.find((user) => user.id === id);

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

  public update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    if (!oldPassword || !newPassword) {
      throw new HttpException(
        'Bad request. userId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    valodatorId(id);

    const user = mockUsers.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== oldPassword) {
      throw new HttpException('oldPassword is wrong', HttpStatus.FORBIDDEN);
    }

    user.password = newPassword;
    user.version++;
    user.updatedAt = Date.now();

    const userWithNotPassword = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return userWithNotPassword;
  }

  public remove(id: string) {
    valodatorId(id);
    const userIdInd = mockUsers.findIndex((user) => user.id === id);
    if (userIdInd === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    mockUsers.splice(userIdInd, 1);
  }
}
