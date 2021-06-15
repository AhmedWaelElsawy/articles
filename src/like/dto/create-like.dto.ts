import { Article } from './../../article/article.entity';
import { Author } from './../../author/author.entity';
import {
  IsInt,
  IsNotEmpty,
} from "class-validator";

import { Type } from "class-transformer"

export class CreateOrDeleteLikeDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  author: number | Author;
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  article: number | Article;
}
