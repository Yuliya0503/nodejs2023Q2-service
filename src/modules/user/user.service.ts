import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';
import { mockUsers } from 'src/db/db';

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
    const { password, ...userWithNotPassword } = newUser;
    //password

    return userWithNotPassword;
  }

  public getUsers() {
    const users = mockUsers.map(({ password, ...allWithNotPass }) => {
      return allWithNotPass;
    });
    return users;
  }
}
