import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tokens')
export class TokenEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false})
    token: string;

    @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
    email: string;
}