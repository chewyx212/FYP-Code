import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsBoolean } from 'class-validator';
import { CreateRoomScheduleDto } from './create-room-schedule.dto';

export class UpdateRoomDto extends PartialType(CreateRoomScheduleDto) {}
