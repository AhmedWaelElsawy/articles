import { Article } from './../article/article.entity';
import { LikeService } from './like.service';
import { Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateOrDeleteLikeDto } from './dto/create-like.dto';

@Controller('article/:article')
export class LikeController {
    constructor(
        private readonly likeService: LikeService
    ) { }

    @Post('/like')
    like(
        @Param('article')
        param: CreateOrDeleteLikeDto
    ): Promise<Article> {
        return this.likeService.likeArticle(param);
    }

    @Delete('/unlike')
    unlike(
        @Param('article')
        param: CreateOrDeleteLikeDto
    ): Promise<Article> {
        return this.likeService.unlikeArticle(param);
    }
}
