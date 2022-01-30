import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateDeskDto {
  @IsString()
  @IsNotEmpty()
  areaId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  detail: string;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsString()
  @IsNotEmpty()
  lat: number;

  @IsString()
  @IsNotEmpty()
  lng: number;
}
