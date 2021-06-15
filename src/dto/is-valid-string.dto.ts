import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
export class ValidValue {
    @IsNotEmpty()
    @IsString()
    value: string;
}
