import { Author } from './../author/author.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '../interfaces/token.interface';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): TokenPayload | string | number => {
    const request = ctx.switchToHttp().getRequest();
    const user: TokenPayload = request.user;
    return data ? user?.[data] : user;
  },
);