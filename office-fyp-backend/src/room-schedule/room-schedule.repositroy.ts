import { RoomSchedule } from './room-schedule.entity';
import { CreateRoomScheduleDto } from './dto/create-room-schedule.dto';
import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Room } from 'src/room/room.entity';
import { User } from 'src/auth/user.entity';

@EntityRepository(RoomSchedule)
export class RoomScheduleRepository extends Repository<RoomSchedule> {
  async createRoomSchedule(createRoomScheduleDetail: {
    room: Room;
    user: User;
    startTime: number;
    endTime: number;
    date: Date;
  }) {
    const roomSchedule = this.create(createRoomScheduleDetail);
    console.log(roomSchedule)
    try {
      await this.save(roomSchedule);
    } catch (error) {
      console.log(error)
      if (error.errno === 1062) {
        throw new ConflictException('already registered');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return roomSchedule;
  }
}
