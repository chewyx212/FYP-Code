import { UserInfoType } from "./authType";

export interface RoomType {
  id: string;
  name: string;
  detail: string;
  status: boolean;
}
export interface RoomScheduleType {
  id: string;
  room: RoomType;
  user: UserInfoType;
  datetime: Date;
  duration: number;
}
