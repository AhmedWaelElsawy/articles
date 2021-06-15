import { CommentModule } from './../src/comment/comment.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from '../src/author/author.entity';
import { Comment } from '../src/comment/comment.entity';
import { Article } from '../src/article/article.entity';

describe('CommentController (e2e)', () => {
  let app: INestApplication;

  const articlesList = [
    {
      id: 1,
      title: 'article 1',
      body: 'article 1 body',
      author: 1,
      likesCount: 0,
      comments: []
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

  const mockArticleRepo = {
    findOneOrFail: jest.fn((id) => articlesList[0]),
  }

  const mockAuthorRepo = {
    findOneOrFail: jest.fn((id) => id),
  }

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

  const mockCommentRepo = {
    create: jest.fn((dto) => ({
      ...dto,
      id:1
    })),
    save: jest.fn((dto) => dto)
  }



  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CommentModule],
    }).overrideProvider(getRepositoryToken(Comment)).useValue(mockCommentRepo)
    .overrideProvider(getRepositoryToken(Author)).useValue(mockAuthorRepo)
    .overrideProvider(getRepositoryToken(Article)).useValue(mockArticleRepo)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  it('article/comment (POST)', () => {
    return request(app.getHttpServer())
      .post('/article/comment')
      .send(commentToCreate)
      .expect('Content-Type', /json/)
      .expect(201, articleToReturn);
  });

});
