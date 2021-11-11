import { Author } from './../author/author.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): Author | string | number => {
    const request = ctx.switchToHttp().getRequest();
    const user: Author = request.user.author ? request.user.author : request.user;
    return data ? user?.[data] : user;
  },
);