import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Autenticar usuário',
    description:
      'Realiza login do usuário com base em username e ID, retornando um token JWT',
  })
  @ApiBody({
    description: 'Credenciais do usuário para login',
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'john_doe',
          description: 'Nome de usuário',
        },
        id: {
          type: 'string',
          example: '123',
          description: 'ID do usuário',
        },
      },
      required: ['username', 'id'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso. Retorna token JWT',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwic3ViIjoiMTIzIiwiaWF0IjoxNjMyNzUwNDAwfQ.signature',
          description: 'Token JWT para autenticação das requisições',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Falha na autenticação - credenciais inválidas',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.authService.signIn(signInDto.username, signInDto.id);
  }
}
