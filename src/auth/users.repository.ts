import { Repository, DataSource } from "typeorm";
import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { User } from "./user.entity";
import { hashSync } from "bcrypt";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const hashedPassword = hashSync(password, 10);
    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username alreadry existed");
      } else {
        throw new InternalServerErrorException("Something went wrong");
      }
    }
  }
  async getAUserByUsername(username: string): Promise<User> {
    const user = await this.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException("User not found!");
    }
    return user;
  }
}
