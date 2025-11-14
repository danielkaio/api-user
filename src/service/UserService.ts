import { Injectable, NotFoundException } from '@nestjs/common';
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

  async deleteOne(id: number) {
    const user = await this.UserModel.destroy({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('usuario não encontrado ');
    }
  }
  async findOne(id: number): Promise<any> {
    const user = await this.UserModel.findOne<User>({
      where: { id },
      raw: true,
    });

    if (!user) {
      throw new NotFoundException('Usuário não existe');
    }

    return user;
  }

  async Update(id: number, data: any): Promise<any> {
    const user = await this.UserModel.findByPk(id);
    if (!user) throw new Error('Usuário não existe');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return user.update(data);
  }

  async create(data): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.UserModel.create(data);
  }
}
