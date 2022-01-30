import { IsNotEmpty, IsString } from 'class-validator';

export class FindAreaDto {
  @IsString()
  @IsNotEmpty()
  branchId: string;
}
