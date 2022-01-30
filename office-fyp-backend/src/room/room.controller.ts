import { User } from './../auth/user.entity';
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
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

@UseGuards(AuthGuard())
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post()
  create(@GetUser() user: User, @Body() createRoomDto: CreateRoomDto) {
    console.log(createRoomDto);
    return this.roomService.create(user, createRoomDto);
  }

  @Get()
  findAll(@GetUser() user: User, @Query() { branchId }: { branchId: string }) {
    return this.roomService.findAll(user, branchId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roomService.remove(+id);
  // }
}
