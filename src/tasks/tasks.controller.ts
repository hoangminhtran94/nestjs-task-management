import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./tasks.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly taskService: TasksService) {
    this.taskService = taskService;
  }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    }
    return this.taskService.getAllTasks();
  }

  @Get("/:id")
  getATask(@Param("id") id: string): Task {
    return this.taskService.getATask(id);
  }

  @Delete("/:id")
  deleteATask(@Param("id") id: string): void {
    this.taskService.deleteATask(id);
  }

  @Post()
  creatTask(@Body() createTaskDto: CreateTaskDto): Task {
    console.log(createTaskDto);
    return this.taskService.createTask(createTaskDto);
  }

  @Patch("/:id")
  updateTaskStatus(
    @Param("id") id: string,
    @Body("status") status: TaskStatus
  ) {
    return this.taskService.updateTaskStatus(id, status);
  }
}
