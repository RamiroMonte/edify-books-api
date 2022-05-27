import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './app/auth/decorators/current-user.decorator';
import { User } from './app/users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
