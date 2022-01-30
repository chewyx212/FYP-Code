import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class FindDeskDto {
  @IsString()
  @IsNotEmpty()
  areaId: string;
}
