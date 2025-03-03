import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', length: 100, nullable: false })
  username: string;

  @Column({
    name: 'email',
    length: 100,
    unique: true,
    nullable: false,
  })
  @Index()
  email: string;

  @Column({ name: 'password', length: 100, nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
