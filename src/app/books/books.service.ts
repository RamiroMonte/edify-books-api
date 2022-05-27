import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const bookExists = await this.prisma.books.findMany({
      where: {
        AND: [
          { title: createBookDto.title },
          { subtitle: createBookDto.subtitle },
        ],
      },
    });
    if (bookExists.length > 0) {
      throw new HttpException('Book already exists', HttpStatus.BAD_REQUEST);
    }

    const data = {
      ...createBookDto,
    };

    const book = await this.prisma.books.create({ data });

    return book;
  }

  async findAll(user_id: string) {
    return await this.prisma.books.findMany({
      where: {
        user_id,
      },
      orderBy: {
        starting_read: 'desc',
      },
      include: {
        Author: true,
        BookMeta: true,
      },
    });
  }

  async findOne(id: string): Promise<Partial<Book>> {
    const book = await this.prisma.books.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const bookUpdate = await this.prisma.books.update({
      where: {
        id,
      },
      data: updateBookDto,
    });

    return bookUpdate;
  }

  async remove(id: string) {
    try {
      await this.prisma.books.delete({
        where: {
          id,
        },
      });
      return { message: 'Book deleted' };
    } catch {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
  }
}
