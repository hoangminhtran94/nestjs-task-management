import { Repository, DataSource, Like, And } from "typeorm";
import { Task } from "./task.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./tasks.model";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.create({
      description: createTaskDto.description,
      title: createTaskDto.title,
    });
    return await this.save(newTask);
  }
  async getTaskById(id: string): Promise<Task> {
    const task = await this.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException("Task not found!");
    }
    return task;
  }
  async deleteATask(id: string): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("Task not found!");
    }
  }
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.save(task);
    return task;
  }
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder("task");
    if (status) {
      query.andWhere("task.status = :status", { status });
    }
    if (search) {
      query.andWhere(
        "LOWER(task.title) LIKE :search or LOWER(task.description) LIKE :search",
        { search: `%${search.toLocaleLowerCase()}%` }
      );
    }

    return await query.getMany();
  }
}
