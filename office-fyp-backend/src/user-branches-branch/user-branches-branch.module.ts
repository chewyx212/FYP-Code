import { BranchRepository } from './../branch/branch.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserBranchesBranchService } from './user-branches-branch.service';
import { UserBranchesBranchController } from './user-branches-branch.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserBranchesBranchRepository } from './user-branches-branch.repository';
import { CompanyRepository } from 'src/company/company.repository';
import { UsersRepository } from 'src/auth/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserBranchesBranchRepository,
      CompanyRepository,
      BranchRepository,
      UsersRepository,
    ]),
    AuthModule,
  ],
  controllers: [UserBranchesBranchController],
  providers: [UserBranchesBranchService],
})
export class UserBranchesBranchModule {}
