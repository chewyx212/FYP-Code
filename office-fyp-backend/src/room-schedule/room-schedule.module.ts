import { RoomScheduleRepository } from './room-schedule.repositroy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoomScheduleService } from './room-schedule.service';
import { RoomScheduleController } from './room-schedule.controller';
import { AuthModule } from 'src/auth/auth.module';
import { BranchRepository } from 'src/branch/branch.repository';
import { CompanyRepository } from 'src/company/company.repository';
import { UserBranchesBranchRepository } from 'src/user-branches-branch/user-branches-branch.repository';
import { RoomRepository } from 'src/room/room.repositroy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoomRepository,
      BranchRepository,
      CompanyRepository,
      UserBranchesBranchRepository,
      RoomScheduleRepository
    ]),
    AuthModule,
  ],
  controllers: [RoomScheduleController],
  providers: [RoomScheduleService],
})
export class RoomScheduleModule {}
