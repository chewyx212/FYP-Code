import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateVisitorLogDto {
  @IsString()
  @IsNotEmpty()
  branchId: string;
}
