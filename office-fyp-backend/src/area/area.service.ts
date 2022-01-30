import { DeskRepository } from './../desk/desk.repository';
import { FindAreaDto } from './dto/find-area.dto';
import { BranchRepository } from './../branch/branch.repository';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from 'src/company/company.repository';
import { AreaRepository } from './area.repository';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { User } from 'src/auth/user.entity';
import { UserBranchesBranchRepository } from 'src/user-branches-branch/user-branches-branch.repository';
import { createReadStream } from 'fs';
import { join } from 'path';
import { StreamableFile } from '@nestjs/common';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(AreaRepository)
    private areaRepository: AreaRepository,
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
    @InjectRepository(UserBranchesBranchRepository)
    private userBranchesBranchRepository: UserBranchesBranchRepository,
  ) {}

  async create(user: User, imagePath: string, createAreaDto: CreateAreaDto) {
    const { branchId, name } = createAreaDto;
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
      const area = await this.areaRepository.createArea(
        branch,
        imagePath,
        name,
      );
      return { ...area, image: this.findAreaImage(area.imagePath) };
    } else {
      throw new UnauthorizedException('You have no permission to create');
    }
  }

  findAreaImage = (imagePath: string) => {
    const file = createReadStream(join(process.cwd(), 'files/' + imagePath));
    return new StreamableFile(file);
  };

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
      const areas = await this.areaRepository.find({ branch });
      return areas.map((area) => ({
        ...area,
        imagePath: 'http://127.0.0.1:8887/' + area.imagePath,
        image: this.findAreaImage(area.imagePath),
      }));
    } else {
      throw new UnauthorizedException('You have no permission to view');
    }
  }

  async findOne(id: string) {
    const area = await this.areaRepository.findOne({
      where: { id: id },
      relations: ['desks'],
    });
    return {
      ...area,
      imagePath: 'http://127.0.0.1:8887/' + area.imagePath,
      image: area.imagePath,
    };
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
