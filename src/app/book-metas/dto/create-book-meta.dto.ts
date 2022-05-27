import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { BookMeta } from '../entities/book-meta.entity';

export class CreateBookMetaDto extends BookMeta {
  @IsUUID()
  @IsNotEmpty()
  book_id: string;

  @IsString()
  @IsNotEmpty()
  meta_key: string;

  @IsString()
  @IsNotEmpty()
  meta_value: string;
}
