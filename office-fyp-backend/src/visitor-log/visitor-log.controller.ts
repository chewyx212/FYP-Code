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
import { VisitorLogService } from './visitor-log.service';
import { CreateVisitorLogDto } from './dto/create-visitor-log.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@UseGuards(AuthGuard())
@Controller('visitor-log')
export class VisitorLogController {
  constructor(private readonly visitorLogService: VisitorLogService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createVisitorLogDto: CreateVisitorLogDto,
  ) {
    return this.visitorLogService.create(user, createVisitorLogDto);
  }

  @Get()
  findAll(@Query() { branchId }: { branchId: string }) {
    return this.visitorLogService.findAll(branchId);
  }
}
