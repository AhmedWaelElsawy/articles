import { LikeService } from './like.service';
import { Test, TestingModule } from '@nestjs/testing';
import { LikeController } from './like.controller';

describe('LikeController', () => {
  let controller: LikeController;

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

  const mocLikeService = {
    likeArticle: jest.fn((param) => articleToReturn),
    unlikeArticle: jest.fn((param) => articleToReturn)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers:[
        {
          provide: LikeService,
          useValue: mocLikeService
        }
      ]
    }).compile();

    controller = module.get<LikeController>(LikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should like article', () => {
    expect(controller.like(likeToCreate)).toEqual(articleToReturn);
  });

  it('should unlike article', () => {
    expect(controller.unlike(likeToCreate)).toEqual(articleToReturn);
  });
});
