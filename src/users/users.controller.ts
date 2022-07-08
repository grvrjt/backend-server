import { Body, Controller, Post } from '@nestjs/common';
import { User } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async saveUser(@Body() userData: User) {
    const result = this.usersService.saveUser(userData);
    return {
      success: true,
      payload: result,
    };
  }
}
