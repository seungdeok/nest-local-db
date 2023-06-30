import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserRequestDto } from './dto/user.request.dto';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [];

  getAllUsers(): UserEntity[] {
    return this.users;
  }

  getUser(id: string): UserEntity {
    return this.users.find((data) => data.uid === id);
  }

  createUser(user: UserRequestDto): UserEntity {
    const data = {
      uid: (this.users.length + 1).toString(),
      ...user,
    };

    this.users.push(data);
    return data;
  }

  removeUser(id: string) {
    this.users.filter((data) => data.uid !== id);
    return true;
  }

  updateUser(id: string, user: UserEntity) {
    this.users = this.users.map((data) => {
      if (user.uid === id) {
        return {
          ...data,
          ...user,
        };
      }
      return user;
    });
    return {
      uid: id,
      ...user,
    };
  }
}
