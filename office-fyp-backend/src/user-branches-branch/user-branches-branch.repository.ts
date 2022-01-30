import { CreateBranchUserDto } from './dto/create-user-branches-branch.dto';
import { User } from 'src/auth/user.entity';

import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserBranchesBranch } from './user-branches-branch.entity';
import { Branch } from 'src/branch/branch.entity';

@EntityRepository(UserBranchesBranch)
export class UserBranchesBranchRepository extends Repository<UserBranchesBranch> {
  async createBranchUser(user: User, branch: Branch, is_admin: boolean) {
    const isDuplicated = await this.findOne({ user, branch });
    if (!isDuplicated) {
      const branchUser = this.create({
        user,
        branch,
        is_admin,
      });
      try {
        await this.save(branchUser);
      } catch (error) {
        if (error.errno === 1062) {
          throw new ConflictException('Email already registered');
        } else {
          throw new InternalServerErrorException();
        }
      }
    } else if (!isDuplicated.is_admin && is_admin) {
      isDuplicated.is_admin = is_admin;
      await this.save(isDuplicated);
    } else {
      return new ConflictException('Duplicated!');
    }
  }
  async getCompany(owner: User): Promise<UserBranchesBranch> {
    // const { status, search } = filterDto;

    const query = this.createQueryBuilder('company');
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
      return company;
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
