import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { AuthModule } from 'src/auth/auth.module';
import { RoomRepository } from './room.repositroy';
import { BranchRepository } from 'src/branch/branch.repository';
import { CompanyRepository } from 'src/company/company.repository';
import { UserBranchesBranchRepository } from 'src/user-branches-branch/user-branches-branch.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoomRepository,
      BranchRepository,
      CompanyRepository,
      UserBranchesBranchRepository,
    ]),
    AuthModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
