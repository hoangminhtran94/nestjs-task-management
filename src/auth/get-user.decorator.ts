import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";
//get user from the request
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
