import { DeskRepository } from './desk.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateDeskDto } from './dto/create-desk.dto';
import { FindDeskDto } from './dto/find-desk.dto';
import { UpdateDeskDto } from './dto/update-desk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from 'src/company/company.repository';
import { BranchRepository } from 'src/branch/branch.repository';
import { UserBranchesBranchRepository } from 'src/user-branches-branch/user-branches-branch.repository';
import { AreaRepository } from 'src/area/area.repository';

@Injectable()
export class DeskService {
  constructor(
    @InjectRepository(DeskRepository)
    private deskRepository: DeskRepository,

    @InjectRepository(AreaRepository)
    private areaRepository: AreaRepository,
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
    @InjectRepository(UserBranchesBranchRepository)
    private userBranchesBranchRepository: UserBranchesBranchRepository,
  ) {}

  async create(user: User, createDeskDto: CreateDeskDto) {
    const { areaId } = createDeskDto;
    const area = await this.areaRepository.findOne({
      where: { id: areaId },
      relations: ['branch'],
    });
    if (!area) {
      throw new NotFoundException('Area not found');
    }
    const branch = await this.branchRepository.findOne({ id: area.branch.id });
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
          id: area.branch.id,
          company,
        });
        if (isExisted) {
          gotPermission = true;
        }
      }
    }
    if (gotPermission) {
      console.log('got permission');
      return this.deskRepository.createDesk(area, createDeskDto);
    } else {
      throw new UnauthorizedException('You have no permission to create');
    }
  }

  async findAll(user: User, findDeskDto: FindDeskDto) {
    const { areaId } = findDeskDto;
    const area = await this.areaRepository.findOne({
      where: { id: areaId },
      relations: ['branch'],
    });
    if (!area) {
      throw new NotFoundException('Area not found');
    }
    const branch = await this.branchRepository.findOne({ id: area.branch.id });
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
          id: area.branch.id,
          company,
        });
        if (isExisted) {
          gotPermission = true;
        }
      }
    }
    if (gotPermission) {
      return this.deskRepository.find({ area });
    } else {
      throw new UnauthorizedException('You have no permission to view');
    }
    return `This action returns all desk`;
  }

  findOne(id: string) {
    return this.deskRepository.findOne({
      where: { id: id },
      relations: ['schedules'],
    });
  }

  update(id: number, updateDeskDto: UpdateDeskDto) {
    return `This action updates a #${id} desk`;
  }

  remove(id: number) {
    return `This action removes a #${id} desk`;
  }
}
