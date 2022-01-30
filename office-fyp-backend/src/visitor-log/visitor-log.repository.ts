import { Branch } from './../branch/branch.entity';
import { VisitorLog } from './visitor-log.entity';
import { User } from 'src/auth/user.entity';

import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(VisitorLog)
export class VisitorLogRepository extends Repository<VisitorLog> {
  async userCheckIn(user: User, branch: Branch) {
    console.log('inside repo');
    // const isDuplicated = await this.findOne({ user, branch });
    const log = this.create({
      user,
      branch,
    });
    console.log(log);
    try {
      await this.save(log);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return log;
  }
}
