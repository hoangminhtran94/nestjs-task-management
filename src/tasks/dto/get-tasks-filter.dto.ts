import { TaskStatus } from "../tasks.model";
import { IsEnum, IsString, IsOptional } from "class-validator";
export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
  @IsOptional()
  @IsString()
  search?: string;
}
