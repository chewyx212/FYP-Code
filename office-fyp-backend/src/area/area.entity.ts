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
import { Branch } from 'src/branch/branch.entity';
import { Desk } from 'src/desk/desk.entity';

@Entity()
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  imagePath: string;

  @Column()
  status: boolean;

  @ManyToOne(() => Branch, (branch) => branch.areas)
  @JoinColumn()
  branch: Branch;

  @OneToMany(() => Desk, (desk) => desk.area)
  @JoinColumn()
  desks: Desk[];
}
