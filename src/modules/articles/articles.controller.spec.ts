import { Article } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

describe('ArticlesController', () => {
  let controller: ArticlesController;

  const article: Article = {
    id: 1,
    title: 'test',
    description: 'test',
    body: 'test',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockArticleService = {
    findAll: () => Promise.resolve([article]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [ArticlesService],
    })
      .overrideProvider(ArticlesService)
      .useValue(mockArticleService)
      .compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it.only('should return all articles', () => {
      expect(controller.findAll()).resolves.toEqual([article]);
    });
  });
});
