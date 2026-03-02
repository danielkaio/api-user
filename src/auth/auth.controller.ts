import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

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
    description: 'Dados necessários para autenticar o usuário',
    type: SignInDto,
    examples: {
      basic: {
        summary: 'Credenciais completas',
        value: {
          nome: 'john_doe',
          email: 'john@example.com',
          id: 23,
        },
      },
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
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(
      signInDto.nome,
      signInDto.email,
      signInDto.id,
    );
  }
}
