import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { Article } from '../article/article.entity';
import { AuthorService } from './../author/author.service';
import { ArticleService } from './../article/article.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepo: Repository<Comment>,
        private readonly articleService: ArticleService,
        private readonly authorService: AuthorService) { }


    async addComment(comment: CreateCommentDto): Promise<Article> {
        const author = await this.authorService.getOneById(comment.author as number);
        const article = await this.articleService.getOneById(comment.article as number);
        comment.author = author
        const newComment = this.commentRepo.create(comment);
        const savedComment = await this.commentRepo.save(newComment);
        article.comments.push({
            id: savedComment.id,
            body: savedComment.body,
            author: savedComment.author
        } as Comment)

        return article;
    }

}
