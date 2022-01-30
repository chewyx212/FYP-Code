import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DeskScheduleService } from './desk-schedule.service';
import { CreateDeskScheduleDto } from './dto/create-desk-schedule.dto';
import { UpdateDeskScheduleDto } from './dto/update-desk-schedule.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@UseGuards(AuthGuard())
@Controller('desk-schedule')
export class DeskScheduleController {
  constructor(private readonly deskScheduleService: DeskScheduleService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createDeskScheduleDto: CreateDeskScheduleDto,
  ) {
    return this.deskScheduleService.create(user, createDeskScheduleDto);
  }

  // @Get()
  // findAll(@GetUser() user: User, @Query() { deskId }: { deskId: string }) {
  //   return this.deskScheduleService.findAll(user, deskId);
  // }

  // @Get('/user')
  // findAllUser(
  //   @GetUser() user: User,
  //   @Query() { branchId }: { branchId: string },
  // ) {
  //   return this.deskScheduleService.findAllUser(user, branchId);
  // }
}
