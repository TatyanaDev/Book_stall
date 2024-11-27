import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtStrategy } from '../../core/guards/jwt.strategy';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { UsersModule } from '../users/users.module';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UsersModule],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, JwtStrategy],
})
export class BooksModule {}
