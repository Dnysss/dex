import { IsNumber, IsString } from "class-validator";

export class UpdateCard {
    @IsString()
    name: string;

    @IsNumber()
    categoryId: number;

    @IsString()
    color: string;
}