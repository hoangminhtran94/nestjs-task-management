import { Body, Controller, Post } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  async signUp(@Body() authCredentialDto: AuthCredentialsDto): Promise<void> {
    await this.authService.signup(authCredentialDto);
  }
  @Post("/signin")
  async signin(
    @Body() authCredentialDto: AuthCredentialsDto
  ): Promise<{ token: string }> {
    return await this.authService.signin(authCredentialDto);
  }
}
