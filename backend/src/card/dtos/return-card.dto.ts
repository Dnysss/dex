import { ReturnTask } from 'src/task/dtos/return-task.dto';
import { CardEntity } from '../entities/card.entity';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';

export class ReturnCard {
  id: number;
  name: string;
  amountTasks?: number;
  tasks?: ReturnTask[];

  constructor(cardEntity: CardEntity, amountTasks?: number) {
    this.id = cardEntity.id;
    this.name = cardEntity.name;
    this.amountTasks = amountTasks;
    this.tasks = cardEntity.tasks
      ? cardEntity.tasks.map((product) => new ReturnTask(product))
      : undefined;
  }
}