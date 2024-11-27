import {
  HttpStatus,
  Controller,
  UseGuards,
  HttpCode,
  Request,
  Delete,
  Param,
  Post,
  Body,
  Get,
  Put,
} from '@nestjs/common';
import { AuthenticatedRequest } from '../../types/authenticated-request';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBookById(@Param('id') id: number) {
    return this.booksService.getBookById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createBook(
    @Body() bookDto: CreateBookDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.booksService.createBook(bookDto, req.user.userId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateBook(
    @Param('id') id: number,
    @Body() bookDto: UpdateBookDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;

    return this.booksService.updateBook(id, bookDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async deleteBook(
    @Param('id') id: number,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;

    await this.booksService.deleteBook(id, userId);
  }
}
