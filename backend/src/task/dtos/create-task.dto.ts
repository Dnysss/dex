import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskDTO {
    @IsNumber()
    cardId: number;

    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDateString()
    date: string
}