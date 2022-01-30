import { CreateDeskScheduleDto } from './dto/create-desk-schedule.dto';
import { DeskSchedule } from './desk-schedule.entity';
import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Desk } from 'src/desk/desk.entity';

@EntityRepository(DeskSchedule)
export class DeskScheduleRepository extends Repository<DeskSchedule> {
  async createDeskSchedule(createDeskScheduleDetail: {
    desk: Desk;
    user: User;
    date: Date;
  }) {
    const deskSchedule = this.create(createDeskScheduleDetail);
    try {
      await this.save(deskSchedule);
    } catch (error) {
      console.log(error);
      if (error.errno === 1062) {
        throw new ConflictException('already registered');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return deskSchedule;
  }
}
