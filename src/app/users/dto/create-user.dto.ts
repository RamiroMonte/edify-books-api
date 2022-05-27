import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Message } from 'src/helpers/message.helpers';
import { RegExHelper } from 'src/helpers/regex.helper';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @Matches(RegExHelper.password, { message: Message.PASSWORD_VALID })
  password: string;

  // @Matches(RegExHelper.document, { message: Message.DOCUMENT_VALID })
  // document: string;

  // @IsEnum(['cpf', 'cnpj'])
  // document_type: string;

  @IsOptional()
  @IsEnum(['user', 'admin'])
  role: string;
}
