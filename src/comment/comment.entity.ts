import { Article } from "../article/article.entity";
import { Author } from "../author/author.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    body: string;

    @ManyToOne(() => Author, Author => Author.comments, { nullable: false })
    author: Author | number;

    @ManyToOne(() => Article, Article => Article.comments, { nullable: false })
    article: Article | number;

}