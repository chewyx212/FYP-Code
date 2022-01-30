import { IsNumber, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeskScheduleDto {
  @IsString()
  @IsNotEmpty()
  deskId: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;
}
