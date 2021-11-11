import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Ability, MongoQuery } from "@casl/ability";
import { Subjects } from '../casl/casl-ability.factory';
import { Action } from '../enums/user-actions.enum';
import { AnyObject } from '@casl/ability/dist/types/types';

export type UserAbility = Ability<[Action, Subjects], MongoQuery<AnyObject>>;

export const CASLAbility = createParamDecorator(
  (data: string, ctx: ExecutionContext): UserAbility => {
    const request = ctx.switchToHttp().getRequest();
    const ability: UserAbility = request.user.ability;
    return ability;
  },
);