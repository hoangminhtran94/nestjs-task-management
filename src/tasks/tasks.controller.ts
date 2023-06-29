import { Controller, Get } from "@nestjs/common";
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
}
