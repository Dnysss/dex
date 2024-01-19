import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { Roles } from '../decorators/roles.decorator';
  import { UserType } from '../user/enum/user-type.enum';
  import { DeleteResult } from 'typeorm';
import { TaskService } from './task.service';
import { ReturnTask } from './dtos/return-task.dto';
import { CreateTaskDTO } from './dtos/create-task.dto';
import { TaskEntity } from './entities/task.entity';
import { UpdateTaskDTO } from './dtos/update-task.dto';
import { UserId } from 'src/decorators/user-id.decorator';
  
  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Controller('task')
  export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    @Roles(UserType.Admin, UserType.Root, UserType.User)
    @Get()
    async findAll(): Promise<ReturnTask[]> {
      return (await this.taskService.findAll([], true)).map(
        (task) => new ReturnTask(task),
      );
    }
  
    @Roles(UserType.Admin, UserType.Root, UserType.User)
    @Get('/:taskId')
    async findTaskById(@Param('taskId') taskId): Promise<ReturnTask> {
      return new ReturnTask(
        await this.taskService.findTaskById(taskId, true),
      );
    }
  
    @Roles(UserType.Admin, UserType.Root, UserType.User)
    @UsePipes(ValidationPipe)
    @Post()
    async createTask(
      @Body() createTask: CreateTaskDTO, @UserId() userId: number,
    ): Promise<TaskEntity> {
      return this.taskService.createTask(userId, createTask);
    }
  
    @Roles(UserType.Admin, UserType.Root, UserType.User)
    @Delete('/:taskId')
    async deleteTask(
      @Param('taskId') taskId: number,
    ): Promise<DeleteResult> {
      return this.taskService.deleteTask(taskId);
    }
  
    @Roles(UserType.Admin, UserType.Root, UserType.User)
    @UsePipes(ValidationPipe)
    @Put('/:taskId')
    async updateTask(
      @Body() updateTask: UpdateTaskDTO,
      @Param('taskId') taskId: number,
    ): Promise<TaskEntity> {
      return this.taskService.updateTask(updateTask, taskId);
    }
  }