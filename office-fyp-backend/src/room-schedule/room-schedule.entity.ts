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
import { User } from 'src/auth/user.entity';
import { Branch } from 'src/branch/branch.entity';
import { Room } from 'src/room/room.entity';

@Entity()
export class RoomSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  date: Date;

  @Column()
  startTime: number;
  @Column()
  endTime: number;

  @ManyToOne(() => User, (user) => user.roomSchedules, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Room, (room) => room.schedules, { eager: true })
  @JoinColumn()
  room: Room;
}
