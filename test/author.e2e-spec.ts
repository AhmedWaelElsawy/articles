import { AuthorModule } from './../src/author/author.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from '../src/author/author.entity';

describe('AuthorController (e2e)', () => {
  let app: INestApplication;

  const authorToCreate = {
    name: 'author 1',
    jobTitle: 'SE'
  };
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
      imports: [AuthorModule],
    }).overrideProvider(getRepositoryToken(Author)).useValue(mockAuthorRepo).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/author (GET)', () => {
    return request(app.getHttpServer())
      .get('/author')
      .expect('Content-Type', /json/)
      .expect(200, authorsList);
  });

  it('/author (POST)', () => {
    return request(app.getHttpServer())
      .post('/author')
      .send(authorToCreate)
      .expect('Content-Type', /json/)
      .expect(201, authorsList[0]);
  });

  it('/author/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/author/1')
      .expect('Content-Type', /json/)
      .expect(200, authorsList[0]);
  });

});
