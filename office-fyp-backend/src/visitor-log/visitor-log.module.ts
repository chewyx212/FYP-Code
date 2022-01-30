import { VisitorLogRepository } from './visitor-log.repository';
import { UsersRepository } from './../auth/users.repository';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VisitorLogService } from './visitor-log.service';
import { VisitorLogController } from './visitor-log.controller';
import { BranchRepository } from 'src/branch/branch.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BranchRepository,
      VisitorLogRepository,
      UsersRepository,
    ]),
    AuthModule,
  ],
  controllers: [VisitorLogController],
  providers: [VisitorLogService],
})
export class VisitorLogModule {}
