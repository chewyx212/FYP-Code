import axios from "../utils/axios/AxiosHandler";

export const AuthApi = {
  login: async (data: { email: string; password: string }) => {
    console.log("im calling");
    return axios.post("/signin", data);
  },
  register: async (data: { email: string; name: string; password: string }) => {
    return axios.post("/signup", data);
  },
  getDetail: async () => {
    return axios.get("/company/detail");
  },
};
