import { RoomSchedule } from './room-schedule.entity';
import { RoomScheduleRepository } from './room-schedule.repositroy';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { BranchRepository } from 'src/branch/branch.repository';
import { CompanyRepository } from 'src/company/company.repository';
import { RoomRepository } from 'src/room/room.repositroy';
import { UserBranchesBranchRepository } from 'src/user-branches-branch/user-branches-branch.repository';
import { CreateRoomScheduleDto } from './dto/create-room-schedule.dto';

@Injectable()
export class RoomScheduleService {
  constructor(
    @InjectRepository(RoomScheduleRepository)
    private roomScheduleRepository: RoomScheduleRepository,
    @InjectRepository(RoomRepository)
    private roomRepository: RoomRepository,
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
    @InjectRepository(UserBranchesBranchRepository)
    private userBranchesBranchRepository: UserBranchesBranchRepository,
  ) {}

  async create(user: User, createRoomScheduleDto: CreateRoomScheduleDto) {
    const { branchId, roomId, startTime, endTime, date } =
      createRoomScheduleDto;
    const branch = await this.branchRepository.findOne({ id: branchId });
    if (!branch) {
      throw new NotFoundException('Branch Not Found');
    }
    const checkAdmin = await this.userBranchesBranchRepository.findOne({
      user,
      branch,
    });
    let gotPermission = checkAdmin && checkAdmin.is_admin;
    if (!checkAdmin || !checkAdmin.is_admin) {
      const company = await this.companyRepository.getCompany(user);
      if (company) {
        const isExisted = await this.branchRepository.findOne({
          id: branchId,
          company,
        });
        if (isExisted) {
          gotPermission = true;
        }
      }
    }
    if (gotPermission) {
      const room = await this.roomRepository.findOne({ id: roomId });

      return await this.roomScheduleRepository.createRoomSchedule({
        room,
        user,
        startTime,
        endTime,
        date,
      });
    } else {
      throw new UnauthorizedException('You have no permission to create');
    }
  }

  async findAll(user: User, branchId: string) {
    const branch = await this.branchRepository.findOne({ id: branchId });
    if (!branch) {
      throw new NotFoundException('Branch Not Found');
    }
    const checkAdmin = await this.userBranchesBranchRepository.findOne({
      user,
      branch,
    });
    let gotPermission = checkAdmin && checkAdmin.is_admin;
    if (!checkAdmin || !checkAdmin.is_admin) {
      const company = await this.companyRepository.getCompany(user);
      if (company) {
        const isExisted = await this.branchRepository.findOne({
          id: branchId,
          company,
        });
        if (isExisted) {
          gotPermission = true;
        }
      }
    }
    if (gotPermission) {
      const rooms = await this.roomRepository.find({ branch });
      const findRoom = async (room) => {
        const result = await this.roomScheduleRepository.find({ room });
        if (result && result.length > 0) {
          return result;
        }
        return [];
      };
      let allSchedules: RoomSchedule[] = [];
      if (rooms && rooms.length > 0) {
        for await (const contents of rooms.map((room) => findRoom(room))) {
          allSchedules = allSchedules.concat(contents);
        }
        return allSchedules;
      }
      console.log('outputting ,', allSchedules);
      return ['asd'];
    } else {
      throw new UnauthorizedException('You have no permission to view');
    }
  }
  async findAllUser(user: User, branchId: string) {
    const branch = await this.branchRepository.findOne({ id: branchId });
    if (!branch) {
      throw new NotFoundException('Branch Not Found');
    }
    const checkAdmin = await this.userBranchesBranchRepository.findOne({
      user,
      branch,
    });
    let gotPermission = checkAdmin && checkAdmin.is_admin;
    if (!checkAdmin || !checkAdmin.is_admin) {
      const company = await this.companyRepository.getCompany(user);
      if (company) {
        const isExisted = await this.branchRepository.findOne({
          id: branchId,
          company,
        });
        if (isExisted) {
          gotPermission = true;
        }
      }
    }
    if (gotPermission) {
      const rooms = await this.roomRepository.find({ branch });
      const findRoom = async (room) => {
        const result = await this.roomScheduleRepository.find({ room, user });
        if (result && result.length > 0) {
          return result;
        }
        return [];
      };
      let allSchedules: RoomSchedule[] = [];
      if (rooms && rooms.length > 0) {
        for await (const contents of rooms.map((room) => findRoom(room))) {
          allSchedules = allSchedules.concat(contents);
        }
        return allSchedules;
      }
      console.log('outputting ,', allSchedules);
      return ['asd'];
    } else {
      throw new UnauthorizedException('You have no permission to view');
    }
  }

  async findOne(id: string) {
    const room = await this.roomRepository.findOne({ id });
    if (room) {
      return await this.roomScheduleRepository.find({ room });
    } else {
      throw new NotFoundException('Room Not Found');
    }
  }

  //   async update(id: string, updateRoomDto: UpdateRoomDto) {
  //     console.log(id);
  //     console.log(updateRoomDto);
  //     return await this.roomRepository.update(id, updateRoomDto);
  //   }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
