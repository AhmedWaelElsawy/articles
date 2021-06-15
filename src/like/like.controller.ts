import { Article } from './../article/article.entity';
import { LikeService } from './like.service';
import { Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateOrDeleteLikeDto } from './dto/create-like.dto';

@Controller('article/like')
export class LikeController {
    constructor(
        private readonly likeService: LikeService
    ) { }

    @Post('/:author/:article')
    like(
        @Param()
        param: CreateOrDeleteLikeDto
    ): Promise<Article> {
        return this.likeService.likeArticle(param);
    }

    @Delete('/:author/:article')
    unlike(
        @Param()
        param: CreateOrDeleteLikeDto
    ): Promise<Article> {
        return this.likeService.unlikeArticle(param);
    }
}
