import { IsNotEmpty, IsString } from 'class-validator';

export class FindRoomDto {
  @IsString()
  @IsNotEmpty()
  branchId: string;
}
