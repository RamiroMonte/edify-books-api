import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { User } from '../users/entities/user.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.booksService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@CurrentUser() user: User, @Body() createBookDto: CreateBookDto) {
    return this.booksService.create({
      ...createBookDto,
      user_id: user.id,
      published_date: new Date(createBookDto.published_date),
      starting_read: new Date(createBookDto.starting_read),
      finished_read: createBookDto.finished_read
        ? new Date(createBookDto.finished_read)
        : null,
    });
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.remove(id);
  }
}
