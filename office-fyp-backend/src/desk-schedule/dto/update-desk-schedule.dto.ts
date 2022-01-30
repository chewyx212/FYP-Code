import { PartialType } from '@nestjs/mapped-types';
import { CreateDeskScheduleDto } from './create-desk-schedule.dto';

export class UpdateDeskScheduleDto extends PartialType(CreateDeskScheduleDto) {}
