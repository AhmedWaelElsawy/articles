import { CASLAbility } from './../decorators/ability.decorator';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { HashingService } from './../shared/hashing/hashing.service';
import { Author } from '../author/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorService } from './author.service';
import { Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Patch, Post, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ValidIdDto } from '../dto/is-valid-id.dto';
import { Public } from '../decorators/public-route.decorator';
import { User } from '../decorators/user.decorator';
import { UserAbility } from '../decorators/ability.decorator';
import { Action } from '../enums/user-actions.enum';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService, private hashingService: HashingService) { }

    @Public()
    @Post()
    async create(
        @Body()
        newAuthor: CreateAuthorDto
    ): Promise<Author> {
        newAuthor.password = await this.hashingService.hash(newAuthor.password)
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

    @Patch('/:id')
    async updateOneById(
        @Param() Params: ValidIdDto,
        @Body() author: UpdateAuthorDto,
        @CASLAbility() ability: UserAbility,
    ): Promise<Author> {
        author.id = Params.id; const existAuthor = await this.authorService.getOneById(author.id)
        if (!ability.can(Action.Update, existAuthor)) {
            throw new UnauthorizedException(`can't update another author`)
        }
        if (author.password) {
            author.password = await this.hashingService.hash(author.password)
        }
        return this.authorService.updateAuthor(author);
    }
}
