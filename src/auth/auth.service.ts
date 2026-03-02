import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/service/UserService';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    email: string,
    id: number,
  ): Promise<{ access_token: string }> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await this.userService.findOne(id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (user?.id !== id) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const payload = { sub: user.id, username: user.nome, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
