import { ArticleService } from './../article/article.service';
import { Comment } from './comment.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { AuthorService } from '../author/author.service';

describe('CommentService', () => {
  let service: CommentService;

  const commentToCreate = {
    body: 'first comment',
    author: 1,
    article: 1
  }

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
  }

  const mocCommentRepo = {
    create: jest.fn((dto) => ({
      ...dto,
      id:1
    })),
    save: jest.fn((dto) => dto)
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
        likesCount: 0,
        comments: [
        ]
      }
    ))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mocCommentRepo
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

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', async () => {
    expect(await service.addComment(commentToCreate)).toEqual(articleToReturn);
  });
});
