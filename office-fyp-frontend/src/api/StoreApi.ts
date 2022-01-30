import axios from "utils/axios/AxiosHandler";

export const StoreApi = {
  getPlatformStore: async () => {
    return axios.get("/api/v1/store/platform/list");
  },
  getIntegrationForm: async (store_platform_id: number) => {
    return axios.get(
      `/api/v1/store/integration/form?store_platform_id=${store_platform_id}`
    );
  },
  saveStore: async (payload: any) => {
    return axios.post("/api/v1/store/create", payload);
  },
  getUserStore: async () => {
    return axios.get("api/v1/store/client/list?authorized=1");
  },
};
