import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { JwtAuthGuard } from './app/auth/guards/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RolesGuard } from './app/auth/guards/roles.guard';
import { UsersModule } from './app/users/users.module';
import { BooksModule } from './app/books/books.module';
import { AuthorsModule } from './app/authors/authors.module';
import { BookMetasModule } from './app/book-metas/book-metas.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, BooksModule, AuthorsModule, BookMetasModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
