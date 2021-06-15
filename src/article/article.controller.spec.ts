import { ArticleService } from './article.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';

describe('ArticleController', () => {
  let controller: ArticleController;

  const articleToCreate = {
    title: 'article 1',
    body: 'article 1 body',
    author: 1
  };
  const articlesList = [
    {
      id: 1,
      title: 'article 1',
      body: 'article 1 body',
      author: 1,
      likesCount: 0
    },
    {
      id: 2,
      title: 'article 2',
      body: 'article 2 body',
      author: 1,
      likesCount: 1
    }
  ];

  const mockArticleService = {
    createArticle: jest.fn((dto) => (
      {
        ...dto,
        id: 1,
        likesCount: 0
      }
    )),
    getAll: jest.fn(() => articlesList),
    getOneById: jest.fn((id) => articlesList.find((article) => article.id === id)),
    searchArticles: jest.fn((value) => articlesList.filter((article) => (article.body.includes(value) || article.title.includes(value)))),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: mockArticleService
        }
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new article', () => {
    expect(controller.create(articleToCreate)).toEqual(articlesList[0]);
  })

  it('should get all articles', () => {
    expect(controller.getAll({sorted: 0})).toEqual(articlesList);
  })

  it('should get article by id', () => {
    expect(controller.getById({id: 2})).toEqual(articlesList[1]);
  })

  it('should get article contains this string', () => {
    expect(controller.search({value: '2'})).toEqual([articlesList[1]]);
  })
});
