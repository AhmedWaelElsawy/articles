import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './author.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

    createAuthor(author: CreateAuthorDto): Promise<Author> {
        const newAuthor = this.authorRepo.create(author);
        return this.authorRepo.save(newAuthor);
    }

}
