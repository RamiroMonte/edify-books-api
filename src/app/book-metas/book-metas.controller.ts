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
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { BookMetasService } from './book-metas.service';
import { CreateBookMetaDto } from './dto/create-book-meta.dto';
import { UpdateBookMetaDto } from './dto/update-book-meta.dto';

@IsPublic()
@Controller('book-metas')
export class BookMetasController {
  constructor(private readonly bookMetasService: BookMetasService) {}

  @Get(':id')
  findAll(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.bookMetasService.findAll(id);
  }

  @Get(':id/:meta_key')
  findByMetaKey(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('meta_key') meta_key: string,
  ) {
    return this.bookMetasService.findByMetaKey(id, meta_key);
  }

  @Post()
  create(@Body() createBookMetaDto: CreateBookMetaDto) {
    return this.bookMetasService.create(createBookMetaDto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBookMetaDto: UpdateBookMetaDto,
  ) {
    return this.bookMetasService.update(id, updateBookMetaDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.bookMetasService.remove(id);
  }
}
