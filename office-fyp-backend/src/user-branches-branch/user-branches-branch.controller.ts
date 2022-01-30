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
import { UserBranchesBranchService } from './user-branches-branch.service';
import { CreateBranchUserDto } from './dto/create-user-branches-branch.dto';
import { UpdateUserBranchesBranchDto } from './dto/update-user-branches-branch.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@UseGuards(AuthGuard())
@Controller('user-branch')
export class UserBranchesBranchController {
  constructor(
    private readonly userBranchesBranchService: UserBranchesBranchService,
  ) {}

  @Post('add-employee-to-branch')
  addEmployee(
    @Body() createBranchUserDto: CreateBranchUserDto,
    @GetUser() user: User,
  ) {
    return this.userBranchesBranchService.createEmployee(
      user,
      createBranchUserDto,
    );
  }
  @Post('add-admin-to-branch')
  addAdmin(
    @Body() createBranchUserDto: CreateBranchUserDto,
    @GetUser() user: User,
  ) {
    return this.userBranchesBranchService.createAdmin(
      user,
      createBranchUserDto,
    );
  }

  @Get('/branch')
  findAll(@Query() { branchId }: { branchId: string }) {
    return this.userBranchesBranchService.findAll(branchId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBranchesBranchService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserBranchesBranchDto: UpdateUserBranchesBranchDto,
  ) {
    return this.userBranchesBranchService.update(
      +id,
      updateUserBranchesBranchDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBranchesBranchService.remove(+id);
  }
}
