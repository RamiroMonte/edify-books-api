import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { UserMeta } from '../entities/user-meta.entity';

export class CreateUserMetaDto extends UserMeta {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  meta_key: string;

  @IsString()
  @IsNotEmpty()
  meta_value: string;
}
