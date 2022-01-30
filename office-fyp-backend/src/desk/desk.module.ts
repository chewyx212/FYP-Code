import { TypeOrmModule } from '@nestjs/typeorm';
import { DeskRepository } from './desk.repository';
import { Module } from '@nestjs/common';
import { DeskService } from './desk.service';
import { DeskController } from './desk.controller';
import { AuthModule } from 'src/auth/auth.module';
import { BranchRepository } from 'src/branch/branch.repository';
import { CompanyRepository } from 'src/company/company.repository';
import { UserBranchesBranchRepository } from 'src/user-branches-branch/user-branches-branch.repository';
import { AreaRepository } from 'src/area/area.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DeskRepository,
      AreaRepository,
      BranchRepository,
      CompanyRepository,
      UserBranchesBranchRepository,
    ]),
    AuthModule,
  ],
  controllers: [DeskController],
  providers: [DeskService],
})
export class DeskModule {}
