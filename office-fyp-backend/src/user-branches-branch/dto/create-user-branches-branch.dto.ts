import { IsEmail, IsString } from 'class-validator';

export class CreateBranchUserDto {
  @IsEmail()
  email: string;

  @IsString()
  branchId: string;
}
