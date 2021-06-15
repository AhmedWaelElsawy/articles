import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleModule } from './article/article.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { SharedModule } from './shared/shared.module';
import config from '../ormconfig'

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthorModule,
    ArticleModule,
    LikeModule,
    CommentModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }