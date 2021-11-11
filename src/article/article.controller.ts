import { ValidSorted } from '../dto/is-valid-bool.dto';
import { ValidValue } from '../dto/is-valid-string.dto';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ValidIdDto } from '../dto/is-valid-id.dto';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Public } from '../decorators/public-route.decorator';

@Controller('article')
export class ArticleController {

    constructor(private readonly articleService: ArticleService) { }

    @Post()
    create(
        @Body()
        newArticle: CreateArticleDto
    ): Promise<Article> {
        return this.articleService.createArticle(newArticle);
    }

    @Public()
    @Get()
    getAll(@Query() query: ValidSorted): Promise<Article[]> {
        return this.articleService.getAll(query.sorted);
    }
    
    @Public()
    @Get('/search')
    search(@Query() query: ValidValue): Promise<Article[]> {
        return this.articleService.searchArticles(query.value);
    }

    @Get('/:id')
    getById(
        @Param() Params: ValidIdDto
    ): Promise<Article> {
        return this.articleService.getOneById(Params.id);
    }




}
