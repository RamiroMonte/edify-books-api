import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

import { Book } from '../entities/book.entity';

export class CreateBookDto extends Book {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  @IsOptional()
  subtitle: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  page_count: number;

  @IsNumber()
  @IsOptional()
  user_rating?: number;

  @IsString()
  @IsOptional()
  published_date: string | Date;

  @IsString()
  starting_read: string | Date;

  @IsString()
  @IsOptional()
  finished_read?: string | Date;

  @IsString()
  @IsOptional()
  image_url?: string;
}
