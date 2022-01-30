import { DeskRepository } from './../desk/desk.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DeskScheduleService } from './desk-schedule.service';
import { DeskScheduleController } from './desk-schedule.controller';
import { AreaRepository } from 'src/area/area.repository';
import { BranchRepository } from 'src/branch/branch.repository';
import { DeskScheduleRepository } from './desk-schedule.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AreaRepository,
      BranchRepository,
      DeskRepository,
      DeskScheduleRepository,
    ]),
    AuthModule,
  ],
  controllers: [DeskScheduleController],
  providers: [DeskScheduleService],
})
export class DeskScheduleModule {}
