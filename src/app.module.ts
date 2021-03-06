import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
// import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleModule } from './article/article.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.connection.module'
import { AppConfigModule } from './modules/config.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthorModule,
    ArticleModule,
    LikeModule,
    CommentModule,
    SharedModule,
    AuthModule,
    CaslModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
