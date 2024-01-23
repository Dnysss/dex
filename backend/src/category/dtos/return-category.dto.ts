import { IsOptional, IsString } from "class-validator";

export class ReturnCategoryDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    icon: string;
}