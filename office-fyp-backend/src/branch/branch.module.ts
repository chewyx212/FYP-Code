import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { BranchRepository } from './branch.repository';
import { CompanyRepository } from 'src/company/company.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BranchRepository, CompanyRepository]),
    AuthModule,
  ],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
