import { HashingService } from './../shared/hashing/hashing.service';
import { Author } from '../author/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorService } from './author.service';
import { Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ValidIdDto } from '../dto/is-valid-id.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService, private hashingService: HashingService) { }


    @Post()
    async create(
        @Body()
        newAuthor: CreateAuthorDto
    ): Promise<Author> {
        newAuthor.password = await this.hashingService.hash(newAuthor.password)
        return this.authorService.createAuthor(newAuthor);
    }

    @UseGuards(JwtAuthGuard)
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
