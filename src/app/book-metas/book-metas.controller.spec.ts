import { Test, TestingModule } from '@nestjs/testing';
import { BookMetasController } from './book-metas.controller';
import { BookMetasService } from './book-metas.service';

describe('BookMetasController', () => {
  let controller: BookMetasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookMetasController],
      providers: [BookMetasService],
    }).compile();

    controller = module.get<BookMetasController>(BookMetasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
