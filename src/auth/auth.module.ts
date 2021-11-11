import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { AuthorModule } from './../author/author.module';
import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    SharedModule,
    AuthorModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const config: JwtModuleOptions = {
          secret: configService.get('SECRET_KEY'),
          signOptions: { expiresIn: '30d' },
        };
        return config;
      },
      inject: [ConfigService]
    }),
    CaslModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController]
})
export class AuthModule { }
