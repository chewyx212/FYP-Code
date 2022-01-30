import { BranchRepository } from './branch.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { User } from 'src/auth/user.entity';
import { CompanyRepository } from 'src/company/company.repository';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
  ) {}

  async create(user: User, createBranchDto: CreateBranchDto) {
    const company = await this.companyRepository.getCompany(user);
    if (company) {
      return this.branchRepository.createBranch(company, createBranchDto);
    }
    return { msg: 'No Company found' };
  }

  async findAll(user: User) {
    const company = await this.companyRepository.getCompany(user);
    if (company) {
      return this.branchRepository.getBranch(company);
    }
    return { msg: 'No Company found' };
  }

  async findOne(id: string) {
    return await this.branchRepository.findOne({ id });
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  async delete(id: string) {
    return await this.branchRepository.delete({ id });
  }
}
