import {
  IsNotEmpty,
  IsString,
} from "class-validator";

import {} from "class-transformer"

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  jobTitle: string;
}
