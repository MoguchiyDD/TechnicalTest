import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Index } from 'typeorm';

@Entity("users")
export class UsersEmployee {
  @PrimaryGeneratedColumn()
  id: number;
 
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  @Column({ length: 35, nullable: false })
  name: string;
 
  @Index({ unique: true })
  @Column({ nullable: false })
  email: string;
 
  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  status: boolean;
}
