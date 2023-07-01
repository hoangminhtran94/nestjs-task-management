import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TaskStatus } from "./tasks.model";
import { User } from "src/auth/user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.OPEN })
  status: TaskStatus;

  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
