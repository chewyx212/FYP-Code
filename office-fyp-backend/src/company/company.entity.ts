import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Branch } from 'src/branch/branch.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  size: string;

  @OneToMany(() => Branch, (branch) => branch.company)
  @JoinColumn()
  branches: Branch[];

  @OneToOne(() => User, (user) => user.company, { onDelete: 'SET NULL' })
  @JoinColumn()
  owner: User;
}
