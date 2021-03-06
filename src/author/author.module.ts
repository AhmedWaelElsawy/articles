import { SharedModule } from './../shared/shared.module';
import { Author } from './author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    SharedModule
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService]
})
export class AuthorModule {}
