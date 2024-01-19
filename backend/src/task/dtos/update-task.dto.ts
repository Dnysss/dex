import { IsNumber, IsString } from "class-validator";

export class UpdateTaskDTO {
    @IsNumber()
    cardId: number;

    @IsString()
    name: string;
}