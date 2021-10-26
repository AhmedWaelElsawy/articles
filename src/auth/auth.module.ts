import { LocalStrategy } from './local.strategy';
import { AuthorModule } from './../author/author.module';
import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [SharedModule, AuthorModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
