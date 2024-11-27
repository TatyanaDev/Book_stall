import { ForbiddenException } from '@nestjs/common';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../core/entity/base.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Entity('books')
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  ageRestriction: number;

  @Column()
  ownerId: number;

  @Column({ nullable: true })
  image?: string;

  static createBook(dto: CreateBookDto, userId: number, userAge: number): Book {
    if (userAge < dto.ageRestriction) {
      throw new ForbiddenException(
        'You are not allowed to create a book with an age restriction greater than your age',
      );
    }

    const book = new Book();

    book.title = dto.title;
    book.author = dto.author;
    book.ageRestriction = dto.ageRestriction;
    book.ownerId = userId;
    book.image = dto.image;

    return book;
  }

  updateBook(dto: UpdateBookDto, userId: number): void {
    if (this.ownerId !== userId) {
      throw new ForbiddenException('You are not allowed to update this book');
    }

    this.title = dto.title ?? this.title;
    this.author = dto.author ?? this.author;
    this.ageRestriction = dto.ageRestriction ?? this.ageRestriction;
    this.image = dto.image ?? this.image;
  }

  deleteBook(userId: number): void {
    if (this.ownerId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to to delete this book',
      );
    }
  }
}
