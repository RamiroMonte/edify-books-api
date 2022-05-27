import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const authorExists = await this.prisma.authors.findMany({
      where: {
        name: createAuthorDto.name,
      },
    });
    if (authorExists.length > 0) {
      throw new HttpException('Author already exists', HttpStatus.BAD_REQUEST);
    }

    const data = {
      ...createAuthorDto,
    };

    const author = await this.prisma.authors.create({ data });

    return author;
  }

  async findAll() {
    return await this.prisma.authors.findMany();
  }

  async findOne(id: string): Promise<Partial<Author>> {
    const author = await this.prisma.authors.findUnique({
      where: {
        id,
      },
    });

    if (!author) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const authorUpdate = await this.prisma.authors.update({
      where: {
        id,
      },
      data: updateAuthorDto,
    });

    return authorUpdate;
  }

  async remove(id: string) {
    try {
      await this.prisma.authors.delete({
        where: {
          id,
        },
      });
      return { message: 'Author deleted' };
    } catch {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }
  }
}
