import {
    Inject,
    Injectable,
    NotFoundException,
    forwardRef,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { DeleteResult, ILike, In, Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { CardService } from 'src/card/card.service';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';
import { CountTask } from './dtos/count-task.dto';
    
  @Injectable()
  export class TaskService {
    constructor(
      @InjectRepository(TaskEntity)
      private readonly taskRepository: Repository<TaskEntity>,
  
      @Inject(forwardRef(() => CardService))
      private readonly cardService: CardService,
    ) {}
  
    async findAll(
      taskId?: number[],
      isFindRelations?: boolean,
    ): Promise<TaskEntity[]> {
      let findOptions = {};
  
      if (taskId && taskId.length > 0) {
        findOptions = {
          where: {
            id: In(taskId),
          },
        };
      }
  
      if (isFindRelations) {
        findOptions = {
          ...findOptions,
          relations: {
            card: true,
          },
        };
      }
  
      const tasks = await this.taskRepository.find(findOptions);
  
      if (!tasks || tasks.length === 0) {
        throw new NotFoundException('Não foram encotrados tarefas');
      }
  
      return tasks;
    }
  
    async createTask(userId: number, createTask: CreateTaskDTO): Promise<TaskEntity> {
      await this.cardService.findCardById(createTask.cardId);
  
      return this.taskRepository.save({
        ...createTask,
        userId,
      });
    }
  
    async findTaskById(
      taskId: number,
      isRelations?: boolean,
    ): Promise<TaskEntity> {
      const relations = isRelations
        ? {
            card: true,
          }
        : undefined;
  
      const task = await this.taskRepository.findOne({
        where: {
          id: taskId,
        },
        relations,
      });
  
      if (!task) {
        throw new NotFoundException(
          `Id da tarefa: '${taskId}' não foi encontrado`,
        );
      }
  
      return task;
    }
  
    async deleteTask(taskId: number): Promise<DeleteResult> {
      await this.findTaskById(taskId);
  
      return this.taskRepository.delete({ id: taskId });
    }
  
    async updateTask(
      updateTask: UpdateTaskDTO,
      taskId: number,
    ): Promise<TaskEntity> {
      const task = await this.findTaskById(taskId);
  
      return this.taskRepository.save({
        ...task,
        ...updateTask,
      });
    }
  
    async countTasksByCard(): Promise<CountTask[]> {
      return this.taskRepository
        .createQueryBuilder('task')
        .select('task.card_id, COUNT(*) as total')
        .groupBy('task.card_id')
        .getRawMany();
    }
  }