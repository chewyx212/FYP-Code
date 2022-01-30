// import { CreateDeskDto } from './dto/create-desk.dto';
// import { EntityRepository, Repository } from 'typeorm';
// import {
//   ConflictException,
//   InternalServerErrorException,
// } from '@nestjs/common';
// import { Desk } from './desk.entity';
// import { Area } from 'src/area/area.entity';

// @EntityRepository(Desk)
// export class DeskRepository extends Repository<Desk> {
//   async createDesk(area: Area, createDeskDto: CreateDeskDto): Promise<Desk> {
//     const { name, detail, status, lat, lng } = createDeskDto;
//     const desk = this.create({
//       name: name,
//       detail,
//       status,
//       lat,
//       lng,
//       area: area,
//     });
//     try {
//       await this.save(desk);
//     } catch (error) {
//       if (error.errno === 1062) {
//         throw new ConflictException('already registered');
//       } else {
//         throw new InternalServerErrorException();
//       }
//     }
//     return desk;
//   }
// }

import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Desk } from './desk.entity';
import { Area } from 'src/area/area.entity';
import { CreateDeskDto } from './dto/create-desk.dto';

@EntityRepository(Desk)
export class DeskRepository extends Repository<Desk> {
  async createDesk(area: Area, createDeskDto: CreateDeskDto): Promise<Desk> {
    const { name, detail, status, lat, lng } = createDeskDto;
    const desk = this.create({
      name,
      detail,
      status,
      lat,
      lng,
      area,
    });
    console.log(desk);
    try {
      await this.save(desk);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('already registered');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return desk;
  }
}
