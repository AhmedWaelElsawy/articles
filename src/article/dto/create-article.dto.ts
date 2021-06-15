import { Author } from '../../author/author.entity';
import {
  IsInt,
  IsNotEmpty,
  IsString,
} from "class-validator";

import { Type } from "class-transformer"

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  author: number | Author;
  
}
