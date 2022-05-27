import { Prisma } from '@prisma/client';

export class Book implements Prisma.BooksUncheckedCreateInput {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  page_count?: number;
  published_date?: string | Date;
  image_url?: string;
  user_rating?: number;
  starting_read: string | Date;
  finished_read?: string | Date;
  created_at?: string | Date;
  updated_at?: string | Date;
  user_id: string;
  BookMeta?: Prisma.BookMetaUncheckedCreateNestedManyWithoutBooksInput;
}
