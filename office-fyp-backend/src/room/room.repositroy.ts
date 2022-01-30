import { CreateRoomDto } from './dto/create-room.dto';
import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Branch } from 'src/branch/branch.entity';
import { Room } from './room.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  async createRoom(
    branch: Branch,
    createRoomDto: CreateRoomDto,
  ): Promise<Room> {
    const { name, detail, status } = createRoomDto;
    const room = this.create({
      name,
      detail,
      status,
      branch,
    });
    try {
      await this.save(room);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('already registered');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return room;
  }
}
