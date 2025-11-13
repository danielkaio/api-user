import { Controller, Delete, Get } from '@nestjs/common';
import { UserService } from './service/UserService';
import { User } from './repository/UserRepository';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Delete('/users')
  removeAll(): void {
    void this.userService.deleteAll();
  }
}
