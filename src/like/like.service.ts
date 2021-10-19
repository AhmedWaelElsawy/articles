import { Article } from '../article/article.entity';
import { AuthorService } from './../author/author.service';
import { ArticleService } from './../article/article.service';
import { CreateOrDeleteLikeDto } from './dto/create-like.dto';
import { Like } from './like.entity';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like)
        private likeRepo: Repository<Like>,
        private readonly articleService: ArticleService,
        private readonly authorService: AuthorService) { }


    async likeArticle(like: CreateOrDeleteLikeDto): Promise<Article> {
        await this.authorService.getOneById(like.author as number);
        const article = await this.articleService.getOneById(like.article as number);
        const newLike = this.likeRepo.create(like);
        await this.likeRepo.save(newLike);
        return this.articleService.incrementLikes(article);
    }

    async unlikeArticle(like: CreateOrDeleteLikeDto): Promise<Article> {
        const deletedResult = await this.likeRepo.delete(like);
        if (deletedResult.affected != 1) {
            throw new ConflictException(`can't delete this like`)
        }
        const article = await this.articleService.getOneById(like.article as number);
        return this.articleService.decrementLikes(article);
    }

}
