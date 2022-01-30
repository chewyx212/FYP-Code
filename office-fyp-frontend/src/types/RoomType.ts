import { UserInfoType } from "./AuthType";
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
  date: Date;
  startTime: number;
  endTime: number;
}
