import { Injectable } from "@nestjs/common";
import { TaskStatus } from "./tasks.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { NotFoundException } from "@nestjs/common/exceptions";
import { TaskRepository } from "./task.repository";
import { Task } from "./task.entity";
import { User } from "src/auth/user.entity";
@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  getTaskById(id: string, user: User): Promise<Task> {
    return this.taskRepository.getTaskById(id, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  deleteATask(id: string, user: User) {
    this.taskRepository.deleteATask(id, user);
  }
  updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    return this.taskRepository.updateTaskStatus(id, status, user);
  }
}
