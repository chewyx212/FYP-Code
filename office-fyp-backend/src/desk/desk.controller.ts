import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { DeskService } from './desk.service';
import { CreateDeskDto } from './dto/create-desk.dto';
import { FindDeskDto } from './dto/find-desk.dto';
import { UpdateDeskDto } from './dto/update-desk.dto';

@UseGuards(AuthGuard())
@Controller('desk')
export class DeskController {
  constructor(private readonly deskService: DeskService) {}

  @Post()
  create(@GetUser() user: User, @Body() createDeskDto: CreateDeskDto) {
    console.log(createDeskDto)
    return this.deskService.create(user, createDeskDto);
  }

  @Get()
  findAll(@GetUser() user: User, @Body() findDeskDto: FindDeskDto) {
    return this.deskService.findAll(user, findDeskDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeskDto: UpdateDeskDto) {
    return this.deskService.update(+id, updateDeskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deskService.remove(+id);
  }
}
