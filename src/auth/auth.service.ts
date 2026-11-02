/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../service/UserService';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    email: string,
    id: number,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(id);

    if (user?.id !== id) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.nome, email: user.email };
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
