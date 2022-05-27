import { Module } from '@nestjs/common';
import { UserMetasModule } from '../user-metas/user-metas.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [UserMetasModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
