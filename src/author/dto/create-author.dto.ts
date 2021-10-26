import {
  IsNotEmpty,
  IsString,
} from "class-validator";

import { } from "class-transformer"

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  jobTitle: string;
}
