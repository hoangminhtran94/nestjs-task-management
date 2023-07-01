import { Repository, DataSource, Like, And } from "typeorm";
import { Task } from "./task.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./tasks.model";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const newTask = this.create({
      description: createTaskDto.description,
      title: createTaskDto.title,
      user: user,
    });
    return await this.save(newTask);
  }
  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.findOne({ where: { id: id, user } });
    if (!task) {
      throw new NotFoundException("Task not found!");
    }
    return task;
  }
  async deleteATask(id: string, user: User): Promise<void> {
    const result = await this.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException("Task not found!");
    }
  }
  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.save(task);
    return task;
  }
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder("task");
    query.where({ user });
    if (status) {
      query.andWhere("task.status = :status", { status });
    }
    if (search) {
      query.andWhere(
        "(LOWER(task.title) LIKE :search or LOWER(task.description) LIKE :search)",
        { search: `%${search.toLocaleLowerCase()}%` }
      );
    }

    return await query.getMany();
  }
}
