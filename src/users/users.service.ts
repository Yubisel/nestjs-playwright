import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

const users: IUser[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@gmail.com',
    password: 'password',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    password: 'password',
  },
];

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto): IUser {
    const newUser = {
      id: users.length + 1,
      ...createUserDto,
    };
    users.push(newUser);
    return newUser;
  }

  findAll(): IUser[] {
    return users;
  }

  findOne(id: number): IUser {
    return users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): IUser {
    const user = this.findOne(id);
    if (!user) {
      return null;
    }
    const updatedUser = {
      ...user,
      ...updateUserDto,
    };
    users[id - 1] = updatedUser;
    return updatedUser;
  }

  remove(id: number): IUser {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }
    const deletedUser = users[index];
    users.splice(index, 1);
    return deletedUser;
  }
}
