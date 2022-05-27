import { Prisma } from '@prisma/client';

export class BookMeta implements Prisma.BookMetaUncheckedCreateInput {
  id?: string;
  book_id: string;
  meta_key: string;
  meta_value: string;
  created_at?: string | Date;
  updated_at?: string | Date;
}
