import { Like } from '../src/like/like.entity';
import { LikeModule } from './../src/like/like.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from '../src/author/author.entity';
import { Article } from '../src/article/article.entity';

describe('LikeController (e2e)', () => {
  let app: INestApplication;

  const articlesList = [
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
    save: jest.fn((dto) => {
        if(dto.likesCount == 1){
            dto.likesCount = 0
        }
        return dto
    }),
  }

  const mockAuthorRepo = {
    findOneOrFail: jest.fn((id) => id),
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
  };

  const mocLikeRepo = {
    create: jest.fn((dto) => dto),
    save: jest.fn((dto) => dto),
    delete: jest.fn((dto) => ({affected: 1})),
  }



  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LikeModule],
    }).overrideProvider(getRepositoryToken(Like)).useValue(mocLikeRepo)
    .overrideProvider(getRepositoryToken(Author)).useValue(mockAuthorRepo)
    .overrideProvider(getRepositoryToken(Article)).useValue(mockArticleRepo)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  it('article/like (POST)', () => {
    return request(app.getHttpServer())
      .post('/article/like/2/1')
      .expect('Content-Type', /json/)
      .expect(201, {...articleToReturn, likesCount: 2});
  });

  it('article/unlike (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/article/like/2/1')
      .expect('Content-Type', /json/)
      .expect(200, articleToReturn);
  });

});
