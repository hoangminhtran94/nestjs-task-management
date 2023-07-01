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
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly taskService: TasksService) {
    this.taskService = taskService;
  }

  @Get()
  async getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User
  ): Promise<Task[]> {
    return await this.taskService.getTasks(filterDto, user);
  }

  @Get("/:id")
  async getTaskById(
    @Param("id") id: string,
    @GetUser() user: User
  ): Promise<Task> {
    return await this.taskService.getTaskById(id, user);
  }

  @Delete("/:id")
  async deleteATask(
    @Param("id") id: string,
    @GetUser() user: User
  ): Promise<void> {
    await this.taskService.deleteATask(id, user);
  }

  @Post()
  async creatTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskDto, user);
  }

  @Patch("/:id")
  async updateTaskStatus(
    @Param("id") id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User
  ) {
    return await this.taskService.updateTaskStatus(
      id,
      updateTaskStatusDto.status,
      user
    );
  }
}
