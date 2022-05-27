import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserMetaDto } from './dto/create-user-meta.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserMetaDto } from './dto/update-user-meta.dto';

@Injectable()
export class UserMetasService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserMetaDto: CreateUserMetaDto) {
    const userMetaExists = await this.prisma.userMeta.findMany({
      where: {
        AND: [
          { user_id: createUserMetaDto.user_id },
          { meta_key: createUserMetaDto.meta_key },
        ],
      },
    });

    if (userMetaExists.length > 0) {
      throw new HttpException(
        'User meta already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userMeta = await this.prisma.userMeta.create({
      data: createUserMetaDto,
    });

    return userMeta;
  }

  async findAll(id: string) {
    return await this.prisma.userMeta.findMany({
      where: {
        user_id: id,
      },
    });
  }

  async findByMetaKey(id: string, metaKey: string) {
    const userMeta = await this.prisma.userMeta.findMany({
      where: {
        AND: [{ user_id: id }, { meta_key: metaKey }],
      },
    });

    return userMeta;
  }

  async update(id: string, updateUserMetaDto: UpdateUserMetaDto) {
    const userMetaExists = await this.prisma.userMeta.findMany({
      where: {
        id,
      },
    });

    if (userMetaExists.length === 0) {
      throw new HttpException(
        'User meta does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userMeta = await this.prisma.userMeta.update({
      where: {
        id,
      },
      data: updateUserMetaDto,
    });

    return userMeta;
  }

  async remove(id: string) {
    try {
      await this.prisma.userMeta.delete({
        where: {
          id,
        },
      });

      return {
        message: 'User meta deleted',
      };
    } catch {
      throw new HttpException('User meta not found', HttpStatus.NOT_FOUND);
    }
  }
}
