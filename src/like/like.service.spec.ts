import { Like } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { LikeService } from './like.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorService } from '../author/author.service';
import { ArticleService } from '../article/article.service';

describe('LikeService', () => {
  let service: LikeService;

  const likeToCreate = {
    author: 2,
    article: 1,
  };

  const articleToReturn = {
    id: 1,
    title: 'article 1',
    body: 'article 1 body',
    author: 1,
    likesCount: 0,
    comments: [
      {
        id:1,
        body: 'first comment',
        author: 1
      }
    ]
  };

  const mocLikeRepo = {
    create: jest.fn((dto) => dto),
    save: jest.fn((dto) => dto),
    delete: jest.fn((dto) => ({affected: 1})),
  }

  const mockAuthorService = {
    getOneById: jest.fn((id) => id)
  }

  const mockArticleService = {
    getOneById: jest.fn((id) => (
      {
        id: 1,
        title: 'article 1',
        body: 'article 1 body',
        author: 1,
        likesCount: 1,
        comments: [
          {
            id:1,
            body: 'first comment',
            author: 1
          }
        ]
      }
    )),
    updateArticle: jest.fn((article) => article),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeService,
        {
          provide: getRepositoryToken(Like),
          useValue: mocLikeRepo
        },
        {
          provide: AuthorService,
          useValue: mockAuthorService
        },
        {
          provide: ArticleService,
          useValue: mockArticleService
        },
      ],
    }).compile();

    service = module.get<LikeService>(LikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should like article', async () => {
    expect(await service.likeArticle(likeToCreate)).toEqual({...articleToReturn, likesCount: 2});
  });

  it('should unlike article', async () => {
    expect(await service.unlikeArticle(likeToCreate)).toEqual(articleToReturn);
  });
});
