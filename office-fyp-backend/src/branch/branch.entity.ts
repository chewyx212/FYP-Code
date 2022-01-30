import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Company } from 'src/company/company.entity';
import { Area } from 'src/area/area.entity';
import { Room } from 'src/room/room.entity';
import { Announcement } from 'src/announcement/announcement.entity';
import { UserBranchesBranch } from 'src/user-branches-branch/user-branches-branch.entity';
import { VisitorLog } from 'src/visitor-log/visitor-log.entity';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @ManyToOne(() => Company, (company) => company.branches, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  company: Company;

  @OneToMany(() => UserBranchesBranch, (user) => user.branch)
  @JoinColumn()
  users: UserBranchesBranch[];

  @OneToMany(() => Announcement, (announcement) => announcement.branch)
  @JoinColumn()
  announcements: Announcement[];

  @OneToMany(() => Area, (area) => area.branch)
  @JoinColumn()
  areas: Area[];

  @OneToMany(() => Room, (room) => room.branch)
  @JoinColumn()
  rooms: Room[];

  @OneToMany(() => VisitorLog, (visitors) => visitors.branch)
  @JoinColumn()
  visitors: VisitorLog[];
}
