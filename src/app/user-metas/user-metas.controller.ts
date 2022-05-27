import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserMetasService } from './user-metas.service';
import { CreateUserMetaDto } from './dto/create-user-meta.dto';
import { UpdateUserMetaDto } from './dto/update-user-meta.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../users/entities/role.enum';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('user-metas')
@IsPublic()
// @Roles(Role.ADMIN, Role.USER)
export class UserMetasController {
  constructor(private readonly userMetasService: UserMetasService) {}

  @Post()
  create(@Body() createUserMetaDto: CreateUserMetaDto) {
    return this.userMetasService.create(createUserMetaDto);
  }

  @Get(':id')
  findAll(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userMetasService.findAll(id);
  }

  @Get(':id/:meta_key')
  findByMetaKey(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('meta_key') meta_key: string,
  ) {
    return this.userMetasService.findByMetaKey(id, meta_key);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserMetaDto: UpdateUserMetaDto,
  ) {
    return this.userMetasService.update(id, updateUserMetaDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userMetasService.remove(id);
  }
}
