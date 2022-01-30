import { LoginForm, RegisterForm } from "types/AuthType";
import axios from "utils/axios/AxiosHandler";

export const authApi = {
  userLogin: async (payload: LoginForm) => {
    return axios.post("/signin", payload);
  },
  userRegister: async (payload: RegisterForm) => {
    return axios.post("/signup", payload);
  },
  getDetail: async () => {
    return axios.get("/company/detail");
  },
};
