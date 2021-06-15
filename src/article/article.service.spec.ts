import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorService } from '../author/author.service';
import { StringsService } from '../shared/strings/strings.service';
import { Article } from './article.entity';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;

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

  const authorsList = [
    {
      id: 1,
      name: 'author 1',
      jobTitle: 'SE'
    },
    {
      id: 2,
      name: 'author 2',
      jobTitle: 'SE'
    }
  ];

  const mockAuthorService = {
    getOneById: jest.fn((id) => authorsList.find((author) => author.id === id)),
  };

  const mocStringsService = {
    handleQuerySpecialChar: jest.fn((value) => value)
  }

  const mockArticleService = {
    create: jest.fn((dto) => (
      {
        title: dto.title,
        body: dto.body,
        author: dto.author.id,
        likesCount: 0,
        id: 1
      }
    )),
    save: jest.fn((dto) => dto),
    find: jest.fn(() => articlesList),
    findOneOrFail: jest.fn(() => articlesList.find((article) => article.id === 2)),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(Article),
          useValue: mockArticleService
        },
        {
          provide: AuthorService,
          useValue: mockAuthorService
        },
        {
          provide: StringsService,
          useValue: mocStringsService
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new article', async () => {
    expect(await service.createArticle(articleToCreate)).toEqual(articlesList[0]);
  })

  it('should get all articles', () => {
    expect(service.getAll(0)).toEqual(articlesList);
  })

  it('should get article by id', async () => {
    expect(await service.getOneById(2)).toEqual(articlesList[1]);
  })

  it('should get article contains this string', () => {
    expect(service.searchArticles('2')).toEqual(articlesList);
  })

  it('should update article', async () => {
    expect(await service.updateArticle(articlesList[1])).toEqual(articlesList[1]);
  })
});
