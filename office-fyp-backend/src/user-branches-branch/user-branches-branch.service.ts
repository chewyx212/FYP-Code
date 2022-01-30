import { UsersRepository } from './../auth/users.repository';
import { UserBranchesBranchRepository } from './user-branches-branch.repository';
import { BranchRepository } from './../branch/branch.repository';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateBranchUserDto } from './dto/create-user-branches-branch.dto';
import { UpdateUserBranchesBranchDto } from './dto/update-user-branches-branch.dto';
import { CompanyRepository } from 'src/company/company.repository';

@Injectable()
export class UserBranchesBranchService {
  constructor(
    @InjectRepository(UserBranchesBranchRepository)
    private userBranchesBranchRepository: UserBranchesBranchRepository,
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
    @InjectRepository(CompanyRepository)
    private companyRepository: CompanyRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async createEmployee(user: User, createBranchUserDto: CreateBranchUserDto) {
    const { email, branchId } = createBranchUserDto;
    const company = await this.companyRepository.findOne({ owner: user });
    const branch = await this.branchRepository.findOne({
      id: branchId,
    });
    const targetUser = await this.usersRepository.findOne({ email });
    if (branch && targetUser) {
      const adminUser = await this.userBranchesBranchRepository.findOne({
        user,
        branch: branch,
      });
      let isSuperAdmin = false;
      if (company) {
        const companyBranch = await this.branchRepository.findOne({
          id: branchId,
          company,
        });
        if (companyBranch) {
          isSuperAdmin = true;
        }
      }
      console.log('am i admin user?');
      console.log(adminUser && adminUser.is_admin);
      console.log('am i super admin?');
      console.log(isSuperAdmin);
      if ((adminUser && adminUser.is_admin) || isSuperAdmin) {
        return this.userBranchesBranchRepository.createBranchUser(
          targetUser,
          branch,
          false,
        );
      } else {
        return new UnauthorizedException();
      }
    } else if (targetUser) {
      return new ConflictException('Branch not found!');
    } else {
      return new ConflictException('No User Found');
    }
  }
  async createAdmin(user: User, createBranchUserDto: CreateBranchUserDto) {
    const { email, branchId } = createBranchUserDto;
    const company = await this.companyRepository.findOne({ owner: user });
    const targetUser = await this.usersRepository.findOne({ email });
    if (!company) {
      throw new NotFoundException('No Company Found!');
    }
    if (!targetUser) {
      throw new NotFoundException('No User Found!');
    }
    const branch = await this.branchRepository.findOne({
      company,
      id: branchId,
    });
    if (branch) {
      return this.userBranchesBranchRepository.createBranchUser(
        targetUser,
        branch,
        true,
      );
    } else {
      const isExisted = await this.branchRepository.findOne({
        id: branchId,
      });
      if (isExisted) {
        throw new NotFoundException('No permission to access this Branch!');
      }
      throw new NotFoundException('No Branch found!');
    }
  }

  async findAll(branchId: string) {
    const branch = await this.branchRepository.findOne({ id: branchId });
    return await this.userBranchesBranchRepository.find({
      where: { branch },
      relations: ['user'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} userBranchesBranch`;
  }

  update(id: number, updateUserBranchesBranchDto: UpdateUserBranchesBranchDto) {
    return `This action updates a #${id} userBranchesBranch`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBranchesBranch`;
  }
}
