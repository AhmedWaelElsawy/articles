import { Article } from "../article/article.entity";
import { Like } from "../like/like.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from './../comment/comment.entity';


@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    jobTitle: string;

    @OneToMany(() => Article, article => article.author)
    articles: Article[];

    @OneToMany(() => Comment, comment => comment.author)
    comments: Comment[];

    @OneToMany(() => Like, like => like.author)
    likes: Like[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}