import {
  IsInt,
  IsNotEmpty,
  IsString,
} from "class-validator";

import { Type } from "class-transformer"
import { Article } from "../../article/article.entity";
import { Author } from "../../author/author.entity";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  body: string;
  
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  author: number | Author;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  article: number | Article;
}
