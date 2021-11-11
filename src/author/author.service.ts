import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './author.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
    constructor(@InjectRepository(Author)
    private authorRepo: Repository<Author>) { }

    getAll(): Promise<Author[]> {
        return this.authorRepo.find()
    }

    async getOneById(id: number): Promise<Author> {
        try {
            const author = await this.authorRepo.findOneOrFail(id);
            return author;
        } catch (error) {
            throw new NotFoundException('Author not found')
        }
    }

    async getOneByUsername(username: string): Promise<Author> {
        try {
            const author = await this.authorRepo.findOneOrFail({username});
            return author;
        } catch (error) {
            throw new NotFoundException('Author not found')
        }
    }

    async createAuthor(author: CreateAuthorDto): Promise<Author> {
        const newAuthor = this.authorRepo.create(author);
        let savedAuthor = await this.authorRepo.save(newAuthor);
        // delete savedAuthor.password;
        return savedAuthor;
    }

    async updateAuthor(author: UpdateAuthorDto): Promise<Author> {
        return this.authorRepo.save(author)
    }

}
