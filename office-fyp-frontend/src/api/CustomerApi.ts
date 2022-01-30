
import axios from "utils/axios/AxiosHandler";

export const CustomerApi = {
  getWCCustomerList: async () => {
    return axios.get("/api/v1/customer/wc/customer/list");
  },
};
