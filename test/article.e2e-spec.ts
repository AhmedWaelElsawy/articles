import { ArticleModule } from './../src/article/article.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from '../src/author/author.entity';
import { Article } from '../src/article/article.entity';

describe('ArticleController (e2e)', () => {
  let app: INestApplication;

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

  const mockArticleRepo = {
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
    findOneOrFail: jest.fn((id) => articlesList[0]),
  }

  const mockAuthorRepo = {
    find: jest.fn(() => authorsList),
    findOneOrFail: jest.fn((id) => authorsList[0]),
    create: jest.fn((dto) => (
      {
        ...dto,
        id: 1
      }
    )),
    save: jest.fn((dto) => dto),
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ArticleModule],
    }).overrideProvider(getRepositoryToken(Article)).useValue(mockArticleRepo)
    .overrideProvider(getRepositoryToken(Author)).useValue(mockAuthorRepo)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/article (GET)', () => {
    return request(app.getHttpServer())
      .get('/article')
      .expect('Content-Type', /json/)
      .expect(200, articlesList);
  });

  it('/article (POST)', () => {
    return request(app.getHttpServer())
      .post('/article')
      .send(articleToCreate)
      .expect('Content-Type', /json/)
      .expect(201, articlesList[0]);
  });

  it('/article/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/article/1')
      .expect('Content-Type', /json/)
      .expect(200, articlesList[0]);
  });

});
