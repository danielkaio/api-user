import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './usuario/usuario';
import { Sequelize } from 'sequelize-typescript';

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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection successful');
      
      await this.sequelize.sync({ force: true });
      console.log('Tables synchronized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
    }
  }
}
