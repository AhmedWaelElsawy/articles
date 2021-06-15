import { AuthorService } from './author.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';

describe('AuthorController', () => {
  let controller: AuthorController;

  const authorToCreate = {
    name: 'author 1',
    jobTitle: 'SE'
  }
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
  ]
  const mockAuthorService = {
    createAuthor: jest.fn((dto) => (
      {
        ...dto,
        id: 1
      }
    )),
    getAll: jest.fn(() => authorsList),
    getOneById: jest.fn((id) => authorsList.find((author) => author.id === id)),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers:[
        {
          provide: AuthorService,
          useValue: mockAuthorService
        }
      ]
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new author', () => {
    expect(controller.create(authorToCreate)).toEqual(authorsList[0]);
  })

  it('should get all authors', () => {
    expect(controller.getAll()).toEqual(authorsList);
  })

  it('should get author by id', () => {
    expect(controller.getById({id: 2})).toEqual(authorsList[1]);
  })

});
