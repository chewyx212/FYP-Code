import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoomScheduleService } from './room-schedule.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateRoomScheduleDto } from './dto/create-room-schedule.dto';

@UseGuards(AuthGuard())
@Controller('room-schedule')
export class RoomScheduleController {
  constructor(private readonly roomScheduleService: RoomScheduleService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createRoomScheduleDto: CreateRoomScheduleDto,
  ) {
    console.log(createRoomScheduleDto);
    return this.roomScheduleService.create(user, createRoomScheduleDto);
  }

  @Get()
  findAll(@GetUser() user: User, @Query() { branchId }: { branchId: string }) {
    return this.roomScheduleService.findAll(user, branchId);
  }

  @Get('/user')
  findAllUser(
    @GetUser() user: User,
    @Query() { branchId }: { branchId: string },
  ) {
    return this.roomScheduleService.findAllUser(user, branchId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomScheduleService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
  //   return this.roomScheduleService.update(id, updateRoomDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roomScheduleService.remove(+id);
  // }
}
