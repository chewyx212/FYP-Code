import { Branch } from './../branch/branch.entity';
import { RoomSchedule } from './../room-schedule/room-schedule.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class VisitorLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.checkins)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Branch, (branch) => branch.visitors)
  @JoinColumn()
  branch: Branch;

  @CreateDateColumn()
  createDate: string;
}
