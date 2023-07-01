import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task.dto";
import { Task } from "./task.entity";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly taskService: TasksService) {
    this.taskService = taskService;
  }

  @Get()
  async getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskService.getTasks(filterDto);
  }

  @Get("/:id")
  async getTaskById(@Param("id") id: string): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }

  @Delete("/:id")
  async deleteATask(@Param("id") id: string): Promise<void> {
    await this.taskService.deleteATask(id);
  }

  @Post()
  async creatTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Patch("/:id")
  async updateTaskStatus(
    @Param("id") id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto
  ) {
    return await this.taskService.updateTaskStatus(
      id,
      updateTaskStatusDto.status
    );
  }
}
