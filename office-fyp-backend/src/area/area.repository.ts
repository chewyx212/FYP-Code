import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Area } from './area.entity';
import { Branch } from 'src/branch/branch.entity';

@EntityRepository(Area)
export class AreaRepository extends Repository<Area> {
  async createArea(
    branch: Branch,
    imagePath: string,
    name: string,
  ): Promise<Area> {
    const area = this.create({
      name,
      branch,
      imagePath,
      status: true,
    });
    try {
      await this.save(area);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return area;
  }
  //   async getBranch(company: Company): Promise<Branch[]> {
  //     // const { status, search } = filterDto;

  //     const query = this.createQueryBuilder('company');
  //     query.where({ company });

  //     // if (status) {
  //     //   query.andWhere('task.status = :status', { status });
  //     // }

  //     // if (search) {
  //     //   query.andWhere(
  //     //     '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
  //     //     { search: `%${search}%` },
  //     //   );
  //     // }

  //     try {
  //       const branches = await query.getMany();
  //       return branches;
  //     } catch (error) {
  //       // this.logger.error(
  //       //   `Failed to get tasks for user "${
  //       //     user.username
  //       //   }". Filters: ${JSON.stringify(filterDto)}`,
  //       //   error.stack,
  //       // );
  //       throw new InternalServerErrorException();
  //     }
  //   }
}
