import { VisitorLog } from './../visitor-log/visitor-log.entity';
import { RoomSchedule } from './../room-schedule/room-schedule.entity';
import { DeskSchedule } from './../desk-schedule/desk-schedule.entity';
import { UserBranchesBranch } from '../user-branches-branch/user-branches-branch.entity';
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
import { Exclude } from 'class-transformer';
import { Company } from 'src/company/company.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  email_verified: boolean;

  @OneToOne(() => Company, (company) => company.owner, { eager: true })
  @JoinColumn()
  company: Company;

  @OneToMany(() => UserBranchesBranch, (branch) => branch.user)
  @JoinColumn()
  branches: UserBranchesBranch[];

  @OneToMany(() => DeskSchedule, (deskSchedule) => deskSchedule.user)
  @JoinColumn()
  deskSchedules: DeskSchedule[];

  @OneToMany(() => RoomSchedule, (roomSchedule) => roomSchedule.user)
  @JoinColumn()
  roomSchedules: RoomSchedule[];

  @OneToMany(() => VisitorLog, (checkin) => checkin.user)
  @JoinColumn()
  checkins: VisitorLog[];
}
