import { FindAreaDto } from './dto/find-area.dto';
import { GetUser } from './../auth/get-user.decorator';
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
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { User } from 'src/auth/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './file-helper';

@UseGuards(AuthGuard())
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
    @Body() createAreaDto: CreateAreaDto,
  ) {
    if (!file) {
      throw new NotFoundException('Not File found');
    }
    // const response = {
    //   name: createAreaDto.name,
    //   originalname: file.originalname,
    //   filename: file.filename,
    //   filepath: file.path,
    // };
    // return response;
    return this.areaService.create(user, file.filename, createAreaDto);
  }

  @Get()
  findAll(@GetUser() user: User, @Query() { branchId }: { branchId: string }) {
    return this.areaService.findAll(user, branchId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areaService.update(+id, updateAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaService.remove(+id);
  }
}
