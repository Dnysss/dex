import { IsString } from "class-validator";

export class CreateCard {
    @IsString()
    name: string;
}