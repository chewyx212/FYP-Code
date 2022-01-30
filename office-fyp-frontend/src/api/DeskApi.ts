import axios from "utils/axios/AxiosHandler";
import axiosFD from "axios";

export const DeskApi = {
  createDesk: async (payload: any) => {
    return axios.post("desk", payload);
  },
  getAllDesk: async (areaId: string) => {
    return axios.get(`desk?areaId=${areaId}`);
  },
};
