import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: any): Promise<any> {
    return this.userService.Update(id, data);
  }

  @Post('/')
  create(@Body() body: string) {
    return this.userService.create(body);
  }
  @Delete('/')
  removeAll(): void {
    void this.userService.deleteAll();
  }
  @Delete(':id')
  async DeleteOne(@Param('id') id: number): Promise<any> {
    return this.userService.deleteOne(id);
  }
}
