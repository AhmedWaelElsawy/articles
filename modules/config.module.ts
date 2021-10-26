import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */

const ENV = process.env.NODE_ENV;
const EnvFile = ENV == 'test'? '.env.test' : '.env'
console.log('Current Environment = ', ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: EnvFile,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASS: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}
