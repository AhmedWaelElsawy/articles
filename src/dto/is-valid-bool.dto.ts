import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsOptional } from "class-validator";

export enum Flag {
    true = 0,
    false = 1,
  }

export class ValidSorted {
    @IsOptional()
    @Type(() => Number)
    @IsEnum(Flag)
    sorted: number;
}
