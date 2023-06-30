import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./tasks.model";
import { v4 } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = [...this.tasks];
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (tasks) =>
          tasks.description.includes(search) || tasks.title.includes(search)
      );
    }

    return tasks;
  }

  getATask(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteATask(id: string): void {
    const tasks = [...this.tasks].filter((task) => task.id !== id);
    this.tasks = tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: v4(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    };
    this.tasks = [...this.tasks, newTask];
    return newTask;
  }
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const tasks = [...this.tasks];
    const currentTaskIndex = tasks.findIndex((task) => task.id === id);
    const currentTask = tasks[currentTaskIndex];
    currentTask.status = status;
    this.tasks = tasks;
    return currentTask;
  }
}
