
import axios from "utils/axios/AxiosHandler";

export const CommonApi = {
  getCountryCode: async () => {
    return axios.get("/api/v1/get-countries-code");
  },
};
