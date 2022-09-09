import { Test, TestingModule } from '@nestjs/testing';
import { Article } from '@prisma/client';
import { Repository } from '../../database/db.service';
import { ArticlesService } from './articles.service';

describe('ArticlesService', () => {
  let service: ArticlesService;

  const article: Article = {
    id: 1,
    title: 'test',
    description: 'test',
    body: 'test',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    article: {
      findMany: () => Promise.resolve([article]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesService, Repository],
    })
      .overrideProvider(Repository)
      .useValue(mockRepository)
      .compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all articles', () => {
      expect(service.findAll()).resolves.toEqual([article]);
    });
  });
});
