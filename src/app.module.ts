import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import configuration, {
  ConfigurationType,
} from './core/config/configurationType';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // Load configuration https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      load: [configuration],
    }),

    // TypeORM Database Configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigurationType>) => {
        const dbSettings = configService.get('dbSettings', { infer: true });

        return {
          type: dbSettings?.DB_TYPE as 'postgres',
          host: dbSettings?.DB_HOST,
          port: dbSettings?.DB_PORT,
          username: dbSettings?.USERNAME,
          password: dbSettings?.PASSWORD,
          database: dbSettings?.DB_NAME,
          autoLoadEntities: true,
          synchronize: true, // Disable in production!
          logging: ['error', 'warn'],
        };
      },
    }),

    // Import application modules
    UsersModule,
    BooksModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
