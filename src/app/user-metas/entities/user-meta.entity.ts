import { Prisma } from '@prisma/client';

export class UserMeta implements Prisma.UserMetaUncheckedCreateInput {
  id?: string;
  user_id: string;
  meta_key: string;
  meta_value: string;
  created_at?: string | Date;
  updated_at?: string | Date;
}
