import { VisitorLogRepository } from './visitor-log.repository';
import { Injectable } from '@nestjs/common';
import { CreateVisitorLogDto } from './dto/create-visitor-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { BranchRepository } from 'src/branch/branch.repository';

@Injectable()
export class VisitorLogService {
  constructor(
    @InjectRepository(VisitorLogRepository)
    private visitorLogRepository: VisitorLogRepository,
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
  ) {}
  async create(user: User, createVisitorLogDto: CreateVisitorLogDto) {
    const { branchId } = createVisitorLogDto;
    const branch = await this.branchRepository.findOne({ id: branchId });

    return await this.visitorLogRepository.userCheckIn(user, branch);
  }

  async findAll(branchId: string) {
    const branch = await this.branchRepository.findOne({ id: branchId });
    console.log(branch);
    const log = await this.visitorLogRepository.find({
      where: { branch: branch },
      relations: ['user', 'branch'],
    });
    return log;
  }
}
