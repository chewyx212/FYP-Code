import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyRepository } from 'src/company/company.repository';
import { Company } from './company.entity';
import { UsersRepository } from 'src/auth/users.repository';
import { BranchRepository } from 'src/branch/branch.repository';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepo: CompanyRepository,
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, user: User) {
    if (await this.companyRepo.getCompany(user)) {
      return { status: 123, msg: 'User already owned a company' };
    }
    return this.companyRepo.createCompany(createCompanyDto, user);
  }

  find(user: User) {
    return this.companyRepo.getCompany(user);
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }
  delete(user: User) {
    const deletedCompany = this.companyRepo.getCompany(user);
    this.companyRepo.delete({ owner: user });
    return deletedCompany;
  }

  async getDetail(user: User) {
    console.log(user);
    const result = await this.userRepository.findOne({
      where: user,
      relations: ['company', 'branches', 'deskSchedules', 'roomSchedules'],
    });
    result.company = await this.companyRepo.getCompany(user);
    if (result.company) {
      result.company.branches = await this.branchRepository.find({
        company: result.company,
      });
    }
    return result;
  }
}
