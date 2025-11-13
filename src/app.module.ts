import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './repository/UserRepository';
import { UserModule } from './user/user.module';
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
    UserModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('✓ Database connection established');

      // Sincronizar modelos
      await this.sequelize.sync({ force: true });
      console.log('✓ Tables synchronized');

      // Verificar se existem usuários
      const userCount = await User.count();
      if (userCount === 0) {
        console.log('Seeding database with initial data...');
        await User.bulkCreate([
          {
            nome: 'John Doe',
            isactive: true,
          },
          {
            nome: 'Jane Doe',
            isactive: true,
          },
        ]);
        console.log('✓ Database seeded successfully');
      } else {
        console.log(`✓ Database already populated with ${userCount} users`);
      }
    } catch (error) {
      console.error('✗ Database initialization failed:', error);
    }
  }
}
