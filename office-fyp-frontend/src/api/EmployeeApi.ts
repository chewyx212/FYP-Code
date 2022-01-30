import axios from "utils/axios/AxiosHandler";
import axiosFD from "axios";

export const EmployeeApi = {
  createRoom: async (payload: {
    name: string;
    detail: string;
    branchId: string;
    status: boolean;
  }) => {
    return axios.post("room", payload);
  },
  getAllEmployee: async (branchId: string) => {
    return axios.get(`user-branch/branch?branchId=${branchId}`);
  },
  addAdmin: async (payload: any) => {
    return axios.post("user-branch/add-admin-to-branch", payload);
  },
  addEmployee: async (payload: any) => {
    return axios.post("user-branch/add-employee-to-branch", payload);
  },
};
