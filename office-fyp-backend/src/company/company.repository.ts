import { CreateCompanyDto } from './dto/create-company.dto';

import { User } from 'src/auth/user.entity';

import { EntityRepository, Repository } from 'typeorm';
import { Company } from './company.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
  async createCompany(
    createCompanyDto: CreateCompanyDto,
    user: User,
  ): Promise<Company> {
    const { email, name, size } = createCompanyDto;
    const company = this.create({
      email,
      name,
      size,
      owner: user,
    });
    try {
      await this.save(company);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Email already registered');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return company;
  }
  async getCompany(owner: User): Promise<Company> {
    // const { status, search } = filterDto;

    const query = this.createQueryBuilder('company').leftJoinAndSelect(
      'company.branches',
      'branches',
    );
    query.where({ owner });

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
      const company = await query.getOne();
      if (company) {
        return company
      }
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
