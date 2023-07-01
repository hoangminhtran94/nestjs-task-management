import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { compareSync } from "bcrypt";
import { User } from "./user.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}
  signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }
  async signin(
    AuthCredentialsDto: AuthCredentialsDto
  ): Promise<{ token: string }> {
    const { username, password } = AuthCredentialsDto;
    let user: User;
    try {
      user = await this.userRepository.getAUserByUsername(username);
    } catch (error) {
      throw new UnauthorizedException("Please check your login credentials");
    }
    const correctPassword = compareSync(password, user.password);
    if (!correctPassword) {
      throw new UnauthorizedException("Please check your login credentials");
    }

    const token = this.jwtService.sign({ userId: user.id });
    return { token };
  }
}
