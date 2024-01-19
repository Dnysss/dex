import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CardEntity } from "src/card/entities/card.entity";

@Entity({ name: 'task' })
export class TaskEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'user_id', nullable: false})
    userId: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'date', nullable: false })
    date: Date;

    @Column({ name: 'card_id', nullable: false})
    cardId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => CardEntity, (card: CardEntity) => card.tasks)
    @JoinColumn({ name: 'card_id', referencedColumnName: 'id' })
    card?: CardEntity;
}