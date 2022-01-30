import { DeskSchedule } from './desk-schedule.entity';
import { DeskScheduleRepository } from './desk-schedule.repository';
import { DeskRepository } from './../desk/desk.repository';
import { User } from './../auth/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeskScheduleDto } from './dto/create-desk-schedule.dto';
import { UpdateDeskScheduleDto } from './dto/update-desk-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaRepository } from 'src/area/area.repository';
import { BranchRepository } from 'src/branch/branch.repository';

@Injectable()
export class DeskScheduleService {
  constructor(
    @InjectRepository(AreaRepository)
    private areaRepository: AreaRepository,
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
    @InjectRepository(DeskRepository)
    private deskRepositroy: DeskRepository,
    @InjectRepository(DeskScheduleRepository)
    private deskScheduleRepository: DeskScheduleRepository,
  ) {}

  async create(user: User, createDeskScheduleDto: CreateDeskScheduleDto) {
    const { deskId, date } = createDeskScheduleDto;
    const desk = await this.deskRepositroy.findOne({ id: deskId });

    return await this.deskScheduleRepository.createDeskSchedule({
      desk,
      user,
      date,
    });
  }

  findAll() {
    // const rooms = await this.roomRepository.find({ branch });
    // const findRoom = async (room) => {
    //   const result = await this.roomScheduleRepository.find({ room });
    //   if (result && result.length > 0) {
    //     return result;
    //   }
    //   return [];
    // };
    // let allSchedules: RoomSchedule[] = [];
    // if (rooms && rooms.length > 0) {
    //   for await (const contents of rooms.map((room) => findRoom(room))) {
    //     allSchedules = allSchedules.concat(contents);
    //   }
    //   return allSchedules;
    // }
    // console.log('outputting ,', allSchedules);
    return ['asd'];
  }

  async findAllUser(user: User, branchId: string) {
    // const branch = await this.branchRepository.findOne({ id: branchId });
    // if (!branch) {
    //   throw new NotFoundException('Branch Not Found');
    // }
    // const area = await this.areaRepository.find({ branch });
    // const findRoom = async (room) => {
    //   const result = await this.roomScheduleRepository.find({ room, user });
    //   if (result && result.length > 0) {
    //     return result;
    //   }
    //   return [];
    // };
    // let allSchedules: DeskSchedule[] = [];
    // if (rooms && rooms.length > 0) {
    //   for await (const contents of rooms.map((room) => findRoom(room))) {
    //     allSchedules = allSchedules.concat(contents);
    //   }
    //   return allSchedules;
    // }
    // console.log('outputting ,', allSchedules);
    return [];
  }

  update(id: number, updateDeskScheduleDto: UpdateDeskScheduleDto) {
    return `This action updates a #${id} deskSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} deskSchedule`;
  }
}
