import { Type } from "class-transformer";
import {
    IsInt,
    IsOptional,
    IsString,
  } from "class-validator";
  
  export class UpdateAuthorDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id?: number;
    @IsOptional()
    @IsString()
    password?: string;
    @IsOptional()
    @IsString()
    name?: string;
    @IsOptional()
    @IsString()
    jobTitle?: string;
  }
  