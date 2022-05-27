import { Prisma } from '@prisma/client';

export class User implements Prisma.UsersUncheckedCreateInput {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  user_meta?: Prisma.UserMetaUncheckedCreateNestedManyWithoutUserInput;
}
