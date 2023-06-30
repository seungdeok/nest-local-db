import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserRequestDto } from './dto/user.request.dto';
import { UsersService } from './users.service';
import { UserEntity } from 'src/entities/user.entity';

@Controller('api/users')
export class UsersController {
  constructor(private userServcie: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userServcie.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userServcie.getUser(id);
  }

  @Post()
  register(@Body() body: UserRequestDto): UserEntity {
    return this.userServcie.createUser(body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userServcie.removeUser(id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body) {
    return this.userServcie.updateUser(id, body);
  }
}
