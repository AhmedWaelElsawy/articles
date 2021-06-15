import { AuthorModule } from './../author/author.module';
import { ArticleModule } from './../article/article.module';
import { Like } from './like.entity';
import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    ArticleModule,
    AuthorModule
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService]
})
export class LikeModule {}
