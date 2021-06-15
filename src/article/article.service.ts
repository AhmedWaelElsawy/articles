import { UpdateArticleDto } from './dto/update-article.dto';
import { StringsService } from './../shared/strings/strings.service';
import { Author } from '../author/author.entity';
import { AuthorService } from './../author/author.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Like } from "typeorm";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepo: Repository<Article>,
        private readonly authorService: AuthorService,
        private readonly stringsService: StringsService
    ) { }

    getAll(sorted = 0): Promise<Article[]> {
        let queryObject: FindManyOptions = {};
        if (sorted) {
            queryObject.order = {
                likesCount: "DESC"
            }
        }
        return this.articleRepo.find(queryObject)
    }

    async getOneById(id: number): Promise<Article> {
        try {
            const article = await this.articleRepo.findOneOrFail({
                where:{
                    id,
                },
                relations: ["comments", "comments.author"]
            });
            return article;
        } catch (error) {
            throw new NotFoundException('article not found')
        }
    }

    async createArticle(article: CreateArticleDto): Promise<Article> {
        try {
            const author: Author = await this.authorService.getOneById(article.author as number);
            article.author = author;
            const newArticle = this.articleRepo.create(article);
            return this.articleRepo.save(newArticle);
        } catch (error) {
            if (error.status == 404) {
                throw new NotFoundException('Author not found');
            } else {
                throw error;
            }
        }

    }

    searchArticles(value: string) {
        const handeldCharacters = this.stringsService.handleQuerySpecialChar(value);
        return this.articleRepo.find({
            where: [
                { title: Like(`%${handeldCharacters}%`) },
                { body: Like(`%${handeldCharacters}%`) },
            ]
        });
    }

    async updateArticle(article: UpdateArticleDto): Promise<Article> {
        await this.getOneById(article.id)
        return this.articleRepo.save(article)
    }

}
