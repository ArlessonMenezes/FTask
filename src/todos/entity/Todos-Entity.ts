import { UserEntity } from "src/users/entity/User-Entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../enum/task-status.enum";

@Entity('todos')
export class TodoEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ default: TaskStatus.OPEN })
    status: TaskStatus;

    @Column({ name: 'user_id', type: 'integer' })
    userId: number

    @ManyToOne(() => UserEntity, (user) => user.todos)
    @JoinColumn({ name: 'users_id' })
    user: UserEntity
}