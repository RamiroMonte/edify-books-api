import { PartialType } from '@nestjs/mapped-types';
import { CreateBookMetaDto } from './create-book-meta.dto';

export class UpdateBookMetaDto extends PartialType(CreateBookMetaDto) {}
