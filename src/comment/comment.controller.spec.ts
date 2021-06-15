import { CommentService } from './comment.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';

describe('CommentController', () => {
  let controller: CommentController;

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

  const mockCommentService = {
    addComment: jest.fn((dto) => articleToReturn)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: mockCommentService
        }
      ]
    }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add comment to article', () => {
    expect(controller.comment(commentToCreate)).toEqual(articleToReturn);
  });
});
