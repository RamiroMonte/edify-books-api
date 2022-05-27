import { Prisma } from '@prisma/client';

export class Author implements Prisma.AuthorsUncheckedCreateInput {
  id?: string;
  name: string;
  created_at?: string | Date;
  updated_at?: string | Date;
}
