import { IsString } from "class-validator";

export class UpdateCard {
    @IsString()
    name: string;
}