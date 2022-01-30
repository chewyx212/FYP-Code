import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { BranchRepository } from 'src/branch/branch.repository';
import { UsersRepository } from 'src/auth/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyRepository,
      BranchRepository,
      UsersRepository,
    ]),
    AuthModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
