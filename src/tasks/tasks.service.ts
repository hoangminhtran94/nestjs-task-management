import { Injectable } from "@nestjs/common";
import { TaskStatus } from "./tasks.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { NotFoundException } from "@nestjs/common/exceptions";
import { TaskRepository } from "./task.repository";
import { Task } from "./task.entity";
@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  getTaskById(id: string): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  deleteATask(id: string) {
    this.taskRepository.deleteATask(id);
  }
  updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return this.taskRepository.updateTaskStatus(id, status);
  }
}
