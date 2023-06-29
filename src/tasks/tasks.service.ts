import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./tasks.model";
import { v4 } from "uuid";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const newTask: Task = {
      id: v4(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };
    this.tasks = [...this.tasks, newTask];
    return newTask;
  }
}
