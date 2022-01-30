import { DecimalToString, DecimalTransformer } from './../decimal.transformer';
import { DeskSchedule } from './../desk-schedule/desk-schedule.entity';
import { Area } from 'src/area/area.entity';
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
import { Transform } from 'class-transformer';

@Entity()
export class Desk {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  detail: string;

  @Column()
  status: boolean;

  @Column('decimal', { precision: 5, scale: 2 })
  lat: number;

  @Column('decimal', { precision: 5, scale: 2 })
  lng: number;

  @ManyToOne(() => Area, (area) => area.desks, {
    eager: true,
  })
  @JoinColumn()
  area: Area;

  @OneToMany(() => DeskSchedule, (schedule) => schedule.desk)
  @JoinColumn()
  schedules: DeskSchedule;
}
