import axios from "utils/axios/AxiosHandler";

export const  OrderApi = {
  getWCOrderList: async () => {
    return axios.get("/api/v1/order/wc/order/list");
  },
};
