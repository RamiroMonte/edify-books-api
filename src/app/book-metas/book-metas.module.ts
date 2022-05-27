import { Module } from '@nestjs/common';
import { BookMetasService } from './book-metas.service';
import { BookMetasController } from './book-metas.controller';

@Module({
  controllers: [BookMetasController],
  providers: [BookMetasService]
})
export class BookMetasModule {}
