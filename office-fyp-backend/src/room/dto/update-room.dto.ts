import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsBoolean } from 'class-validator';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @IsString()
  name?: string;

  @IsString()
  detail?: string;

  @IsBoolean()
  status?: boolean;
}
