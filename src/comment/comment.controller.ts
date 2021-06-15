import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { Controller, Post, Body } from '@nestjs/common';
import { Article } from '../article/article.entity';

@Controller('article/comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) { }

    @Post()
    comment(
        @Body()
        param: CreateCommentDto
    ): Promise<Article> {
        return this.commentService.addComment(param);
    }

}
