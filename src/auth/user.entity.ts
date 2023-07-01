import { Task } from "src/tasks/task.entity";
import { Entity } from "typeorm";
import { PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
