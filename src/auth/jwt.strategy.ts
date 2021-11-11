import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Author } from '../author/author.entity';
import { AppAbility, CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Ability } from '@casl/ability';
import { Action } from '../enums/user-actions.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private caslAbilityFactory: CaslAbilityFactory) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET_KEY'),
    });
  }

  validate(user: any) {
    const newUser = {...user}
    delete newUser.iat;
    delete newUser.exp;
    const author: Author = newUser;
    const ability = this.caslAbilityFactory.createForUser(author)
    return {author, ability};
  }
}