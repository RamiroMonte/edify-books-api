import { Test, TestingModule } from '@nestjs/testing';
import { BookMetasService } from './book-metas.service';

describe('BookMetasService', () => {
  let service: BookMetasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookMetasService],
    }).compile();

    service = module.get<BookMetasService>(BookMetasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
