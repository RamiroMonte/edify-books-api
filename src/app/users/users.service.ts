import * as bcrypt from 'bcrypt';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly USER_SELECT = {
    select: {
      id: true,
      name: true,
      email: true,
      created_at: true,
      updated_at: true,
      role: true,
      // user_meta: true,
    },
  };

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const userExists = await this.prisma.users.findMany({
      where: {
        OR: [{ email: createUserDto.email }],
      },
    });
    if (userExists.length > 0) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const data = {
      ...createUserDto,
      role: createUserDto.role || 'player',
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const user = await this.prisma.users.create({ data, ...this.USER_SELECT });

    return user;
  }

  async findAll() {
    return await this.prisma.users.findMany(this.USER_SELECT);
  }

  async findOne(id: string): Promise<Partial<User>> {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
      ...this.USER_SELECT,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userUpdate = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
        password: await bcrypt.hash(updateUserDto.password, 10),
      },
    });

    return userUpdate;
  }

  async remove(id: string) {
    try {
      await this.prisma.users.delete({
        where: {
          id,
        },
      });
      return { message: 'User deleted' };
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
