import { Author } from './../author/author.entity';
import { Like } from './../like/like.entity';
import { Comment } from './../comment/comment.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    body: string;

    @Column({ default: 0 })
    likesCount: number;

    @ManyToOne(() => Author, author => author.articles, { nullable: false })
    author: Author | number;

    @OneToMany(() => Comment, comment => comment.article)
    comments: Comment[];

    @OneToMany(() => Like, like => like.article)
    likes: Like[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}