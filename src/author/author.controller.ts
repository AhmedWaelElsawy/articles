import { Author } from '../author/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorService } from './author.service';
import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ValidIdDto } from '../dto/is-valid-id.dto';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) { }

    @Post()
    create(
        @Body()
        newAuthor: CreateAuthorDto
    ): Promise<Author> {
        return this.authorService.createAuthor(newAuthor);
    }

    @Get()
    getAll(): Promise<Author[]> {
        return this.authorService.getAll();
    }

    @Get('/:id')
    getById(
        @Param() Params: ValidIdDto
    ): Promise<Author> {
        return this.authorService.getOneById(Params.id);
    }
}
