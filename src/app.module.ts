import { Module, OnModuleInit } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './repository/UserRepository';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Sequelize } from 'sequelize-typescript';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')), // garante número
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        models: [User],
        autoLoadModels: true,
        synchronize: true, // mantém criação automática
        logging: false, // pode trocar para console.log se quiser ver queries
      }),
    }),

    UserModule,
    // módulo de autenticação para /auth
    AuthModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    await this.connectWithRetry();

    await this.sequelize.sync({ force: true });
    console.log('✓ Tables synchronized');

    const userCount = await User.count();
    if (userCount === 0) {
      console.log('Seeding database with initial data...');
      await User.bulkCreate([
        { nome: 'John Doe', isactive: true },
        { nome: 'Jane Doe', isactive: true },
      ]);
      console.log('✓ Database seeded successfully');
    } else {
      console.log(`✓ Database already populated with ${userCount} users`);
    }
  }

  // -------------------------------
  // RETRY SYSTEM
  // -------------------------------
  private async connectWithRetry(retries = 5, delayMs = 3000): Promise<void> {
    while (retries > 0) {
      try {
        console.log(`Trying to connect to database... (${6 - retries}/5)`);
        await this.sequelize.authenticate();
        console.log('✓ Database connection established');
        return;
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.error('✗ Failed to connect:', err.message);

        retries--;
        if (retries === 0) {
          console.error('✗ Out of retries — startup failed');
          throw err;
        }

        console.log(
          `Retrying in ${delayMs / 1000}s... (${retries} retries left)`,
        );
        await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  }
}
