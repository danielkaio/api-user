import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './repository/UserRepository';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '172.17.0.2',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'dev',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
      sync: { force: true },
      logging: console.log,
    }),
    UserModule,
  ],
})
export class AppModule {}
