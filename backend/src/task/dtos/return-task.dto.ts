import { ReturnCard } from "src/card/dtos/return-card.dto";
import { TaskEntity } from "../entities/task.entity";

export class ReturnTask {
    id: number;
    name: string;
    date: string;
    card?: ReturnCard;

    constructor(taskEntity: TaskEntity) {
        this.id = taskEntity.id;
        this.name = taskEntity.name;
        this.date = taskEntity?.date.toString();
        this.card = taskEntity.card ? new ReturnCard(taskEntity.card) : undefined;
    }
}