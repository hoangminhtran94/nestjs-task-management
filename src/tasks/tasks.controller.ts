import { Body, Controller, Get, Post } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./tasks.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly taskService: TasksService) {
    this.taskService = taskService;
  }

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post()
  creatTask(
    @Body("title") title: string,
    @Body("description") description: string
  ): Task {
    return this.taskService.createTask(title, description);
  }
}
