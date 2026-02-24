import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './service/UserService';
import { User } from './repository/UserRepository';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    type: [User],
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get('/')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('ID não encontrado ');
    }

    return this.userService.findOne(userId);
  }

  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiBody({ description: 'Dados do usuário para atualização', type: Object })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<any> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('ID não encontrado');
    }
    return this.userService.Update(userId, data);
  }

  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({ description: 'Dados do usuário para criação', type: Object })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post('/')
  create(@Body() body: string) {
    return this.userService.create(body);
  }
  @ApiOperation({ summary: 'Deletar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Todos os usuários foram deletados com sucesso',
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Delete('/')
  removeAll(): void {
    void this.userService.deleteAll();
  }
  @ApiOperation({ summary: 'Deletar um usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Usuário deletado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @Delete(':id')
  async DeleteOne(@Param('id') id: string): Promise<any> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('ID não encontrado');
    }
    return this.userService.deleteOne(userId);
  }
}
