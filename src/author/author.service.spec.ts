import { Author } from '../author/author.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorService } from './author.service';

describe('AuthorService', () => {
  let service: AuthorService;

  const authorToCreate = {
    name: 'author 1',
    jobTitle: 'SE',
    username: 'Mohamed',
    password: 'Mohamed',
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
    findOneOrFail: jest.fn((id) => authorsList.find((author) => author.id === id)),
    create: jest.fn((dto) => (
      {
        ...dto,
        id: 1
      }
    )),
    save: jest.fn((dto) => (
      {
        ...dto,
        id: 1
      }
    )),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getRepositoryToken(Author),
          useValue: mockAuthorRepo
        }
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all authors', () => {
    expect(service.getAll()).toEqual(authorsList);
  });

  it('should get author by id', async () => {
    expect(await service.getOneById(1)).toEqual(authorsList[0]);
  });

  it('should create a new author', () => {
    expect(service.createAuthor(authorToCreate)).toEqual(authorsList[0]);
  });
});
