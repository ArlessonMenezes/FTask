import { UserEntity } from "src/users/entity/User-Entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('todos')
export class TodoEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ name: 'is-completed', type: 'boolean', default: false })
    isCompleted: boolean;

    @Column({ name: 'user_id', type: 'integer' })
    userId: number

    @ManyToOne(() => UserEntity, (user) => user.todos)
    @JoinColumn({ name: 'users_id' })
    user: UserEntity
}