import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Author } from "../../author/author.entity";

export class UpdateArticleDto {

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    body: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    likesCount: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    author: number | Author;
}
