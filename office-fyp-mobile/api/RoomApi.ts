import axios from "../utils/axios/AxiosHandler";

export const RoomApi = {
  getAllRoom: async (branchId: string) => {
    return axios.get(`room?branchId=${branchId}`);
  },

  getOneRoomDetail: async (roomId: string) => {
    return axios.get(`room/${roomId}`);
  },
  scheduleRoom: async (payload: {
    branchId: string;
    roomId: string;
    startTime: number;
    endTime: number;
    date: string;
  }) => {
    return axios.post("room-schedule", payload);
  },
  getAllRoomSchedule: async (branchId: string) => {
    return axios.get(`room-schedule/user?branchId=${branchId}`);
  },

  getOneRoomSchedule: async (roomId: string) => {
    return axios.get(`room-schedule/${roomId}`);
  },
};
