import { Article } from "../article/article.entity";
import { Author } from "../author/author.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Like {

    @ManyToOne(() => Author, Author => Author.likes, { primary: true, })
    @JoinColumn({ name: "authorId" })
    author: Author | number;

    @ManyToOne(() => Article, Article => Article.likes, { primary: true, })
    @JoinColumn({ name: "articleId" })
    article: Article | number;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}