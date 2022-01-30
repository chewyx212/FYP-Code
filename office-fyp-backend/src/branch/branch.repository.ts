import { User } from 'src/auth/user.entity';

import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { Branch } from './branch.entity';
import { Company } from 'src/company/company.entity';

@EntityRepository(Branch)
export class BranchRepository extends Repository<Branch> {
  async createBranch(
    company: Company,
    createBranchDto: CreateBranchDto,
  ): Promise<Branch> {
    const { name, address } = createBranchDto;
    const branch = this.create({
      name,
      address,
      company,
    });
    try {
      await this.save(branch);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Email already registered');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return branch;
  }
  async getBranch(company: Company): Promise<Branch[]> {
    // const { status, search } = filterDto;

    const query = this.createQueryBuilder('company');
    query.where({ company });

    // if (status) {
    //   query.andWhere('task.status = :status', { status });
    // }

    // if (search) {
    //   query.andWhere(
    //     '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
    //     { search: `%${search}%` },
    //   );
    // }

    try {
      const branches = await query.getMany();
      return branches;
    } catch (error) {
      // this.logger.error(
      //   `Failed to get tasks for user "${
      //     user.username
      //   }". Filters: ${JSON.stringify(filterDto)}`,
      //   error.stack,
      // );
      throw new InternalServerErrorException();
    }
  }
}
