import { TaskEntity } from "src/task/entities/task.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'card' })
export class CardEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'user_id', nullable: false})
    userId: number;

    @Column({ name: 'category_id', nullable: false})
    categoryId: number;

    @Column({ name: 'color', nullable: false })
    color: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => TaskEntity, (task: TaskEntity) => task.card)
    tasks?: TaskEntity[];
}