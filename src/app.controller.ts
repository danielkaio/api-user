import { Controller, Get } from '@nestjs/common';
import { UserService } from './service/UserService';
import { User } from './repository/UserRepository';

@Controller()
export class AppController {
  constructor(private userService: UserService) {}

  @Get('/users')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
