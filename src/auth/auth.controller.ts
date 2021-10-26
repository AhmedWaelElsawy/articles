import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../decorators/user.decorator';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@User() user) {
    return user;
  }
}