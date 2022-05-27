import { IsString, MinLength } from 'class-validator';

import { Author } from '../entities/author.entity';

export class CreateAuthorDto extends Author {
  @IsString()
  @MinLength(2)
  name: string;
}
