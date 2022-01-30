import axios from "../utils/axios/AxiosHandler";

export const VisitorApi = {
  checkin: async (branchId: string) => {
    return axios.post("visitor-log", { branchId });
  },
};
