import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './service/UserService';
import { User } from './repository/UserRepository';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('ID inválido');
    }

    return this.userService.findOne(userId);
  }

  @Delete('/')
  removeAll(): void {
    void this.userService.deleteAll();
  }
}
