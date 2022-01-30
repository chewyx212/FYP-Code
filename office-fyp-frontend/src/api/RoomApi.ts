import axios from "utils/axios/AxiosHandler";
import axiosFD from "axios";

export const RoomApi = {
  createRoom: async (payload: {
    name: string;
    detail: string;
    branchId: string;
    status: boolean;
  }) => {
    return axios.post("room", payload);
  },
  getAllRoom: async (branchId: string) => {
    return axios.get(`room?branchId=${branchId}`);
  },
  editRoom: async (
    branchId: string,
    payload: {
      name: string;
      detail: string;
      status: boolean;
    }
  ) => {
    return axios.patch(`room/${branchId}`, payload);
  },

  scheduleRoom: async (payload: {
    roomId: string;
    branchId: string;
    date: string;
    startTime: number;
    endTime: number;
  }) => {
    return axios.post("room-schedule", payload);
  },
  getAllRoomSchedule: async (branchId: string) => {
    return axios.get(`room-schedule?branchId=${branchId}`);
  },

  getOneRoomSchedule: async (roomId: string) => {
    return axios.get(`room-schedule/${roomId}`);
  },
};
