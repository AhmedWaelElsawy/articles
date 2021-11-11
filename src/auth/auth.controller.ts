import { Author } from './../author/author.entity';
import { AuthService } from './auth.service';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from '../decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@User() user: Author) {
    return this.authService.login(user);
  }

}