import axios from "utils/axios/AxiosHandler";

export const VisitorApi = {
  createRoom: async (payload: {
    name: string;
    detail: string;
    branchId: string;
    status: boolean;
  }) => {
    return axios.post("room", payload);
  },
  getAllVisitor: async (branchId: string) => {
    return axios.get(`visitor-log?branchId=${branchId}`);
  },
};
