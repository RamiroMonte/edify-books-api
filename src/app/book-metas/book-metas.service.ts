import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateBookMetaDto } from './dto/create-book-meta.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBookMetaDto } from './dto/update-book-meta.dto';

@Injectable()
export class BookMetasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookMetaDto: CreateBookMetaDto) {
    const bookMetaExists = await this.prisma.bookMeta.findMany({
      where: {
        AND: [
          { book_id: createBookMetaDto.book_id },
          { meta_key: createBookMetaDto.meta_key },
        ],
      },
    });

    if (bookMetaExists.length > 0) {
      throw new HttpException(
        'Book meta already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const bookMeta = await this.prisma.bookMeta.create({
      data: createBookMetaDto,
    });

    return bookMeta;
  }

  async findAll(id: string) {
    return await this.prisma.bookMeta.findMany({
      where: {
        book_id: id,
      },
    });
  }

  async findByMetaKey(id: string, metaKey: string) {
    const bookMeta = await this.prisma.bookMeta.findMany({
      where: {
        AND: [{ book_id: id }, { meta_key: metaKey }],
      },
    });

    return bookMeta;
  }

  async update(id: string, updateBookMetaDto: UpdateBookMetaDto) {
    const bookMetaExists = await this.prisma.bookMeta.findMany({
      where: {
        id,
      },
    });

    if (bookMetaExists.length === 0) {
      throw new HttpException(
        'Book meta does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const bookMeta = await this.prisma.bookMeta.update({
      where: {
        id,
      },
      data: updateBookMetaDto,
    });

    return bookMeta;
  }

  async remove(id: string) {
    try {
      await this.prisma.bookMeta.delete({
        where: {
          id,
        },
      });

      return {
        message: 'Book meta deleted',
      };
    } catch {
      throw new HttpException('Book meta not found', HttpStatus.NOT_FOUND);
    }
  }
}
