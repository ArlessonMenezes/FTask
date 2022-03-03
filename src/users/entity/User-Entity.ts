import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodoEntity } from '../../todos/entity/Todos-Entity';
import { hashSync } from 'bcrypt';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10)
    }

    @OneToMany(() => TodoEntity, (todo) => todo.user)
    todos: TodoEntity[];
}