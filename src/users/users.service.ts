import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserRequestDto } from './dto/user.request.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserEntity.name)
    private readonly userDbService: DbService<UserEntity>,
  ) {}

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
