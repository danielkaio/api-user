import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Nome de usuário utilizado para login',
    example: 'john_doe',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description:
      'Endereço de e-mail do usuário (opcional para o cenário atual)',
    example: 'john@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'ID numérico do usuário cadastrado',
    example: 23,
  })
  @IsInt()
  id: number;
}
