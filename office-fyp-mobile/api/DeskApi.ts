import axios from "../utils/axios/AxiosHandler";

export const DeskApi = {
  getAllArea: async (branchId: string) => {
    return axios.get(`area?branchId=${branchId}`);
  },
  getOneArea: async (areaId: string) => {
    return axios.get(`area/${areaId}`);
  },

  getOneDeskDetail: async (deskId: string) => {
    return axios.get(`desk/${deskId}`);
  },
  scheduleDesk: async (payload: {
    branchId: string;
    deskId: string;
    date: string;
  }) => {
    return axios.post("desk-schedule", payload);
  },
  getAllDeskSchedule: async (branchId: string) => {
    return axios.get(`desk-schedule/user?branchId=${branchId}`);
  },

  getOneDeskSchedule: async (roomId: string) => {
    return axios.get(`desk-schedule/${roomId}`);
  },
};
