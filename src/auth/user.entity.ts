import { Entity } from "typeorm";
import { PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
}
