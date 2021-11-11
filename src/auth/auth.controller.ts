import { AuthService } from './auth.service';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@User() user) {
    return this.authService.login(user);
  }

}