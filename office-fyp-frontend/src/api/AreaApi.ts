
import axios from "utils/axios/AxiosHandler";
import axiosFD from "axios";

export const AreaApi = {
  getAllArea: async (branchId: string) => {
    return axios.get(`area?branchId=${branchId}`);
  },
  getOneArea: async (areaId: string) => {
    return axios.get(`area/${areaId}`);
  },

  createArea: async (payload: any) => {
    const fd = new FormData();
    const token = await localStorage.getItem("user_token");
    fd.append("name", payload.name);
    fd.append("branchId", payload.branchId);
    if (payload.image) {
      fd.append("image", payload.image);
    }

    return axiosFD.post("area", fd, {
      headers: {
        Authorization: `Bear ${token}`,
        "Content-Type": "Multipart/form-data",
      },
    });
  },
};
