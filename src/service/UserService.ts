import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/repository/UserRepository';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private UserModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.UserModel.findAll();
  }

  deleteAll(): void {
    void this.UserModel.destroy({
      truncate: true,
    });
  }

  async findOne(id: number): Promise<any> {
    const user = await this.UserModel.findOne<User>({
      where: { id },
      raw: true,
    });

    if (!user) {
      throw new Error('Usuário não existe');
    }

    return user;
  }
}
