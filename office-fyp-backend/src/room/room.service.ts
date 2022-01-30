import { UpdateRoomDto } from './dto/update-room.dto';
import { FindRoomDto } from './dto/find-room.dto';
import { BranchRepository } from './../branch/branch.repository';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from 'src/company/company.repository';
import { User } from 'src/auth/user.entity';
import { UserBranchesBranchRepository } from 'src/user-branches-branch/user-branches-branch.repository';
import { RoomRepository } from './room.repositroy';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomRepository)
    private roomRepository: RoomRepository,
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
    @InjectRepository(UserBranchesBranchRepository)
    private userBranchesBranchRepository: UserBranchesBranchRepository,
  ) {}

  async create(user: User, createRoomDto: CreateRoomDto) {
    const { branchId } = createRoomDto;
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
      return this.roomRepository.createRoom(branch, createRoomDto);
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
      return this.roomRepository.find({ branch });
    } else {
      throw new UnauthorizedException('You have no permission to view');
    }
  }

  async findOne(id: string) {
    console.log('inside');
    return await this.roomRepository.findOne({
      where: { id: id },
      relations: ['schedules'],
    });
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    console.log(id);
    console.log(updateRoomDto);
    return await this.roomRepository.update(id, updateRoomDto);
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
