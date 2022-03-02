import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('auth')
export class AuthEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false})
    token: string;

    @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
    email: string;
}