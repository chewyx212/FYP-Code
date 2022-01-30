
import { CreateBranchType } from "types/BranchType";
import axios from "utils/axios/AxiosHandler";

export const BranchApi = {
  getCompanyCategoryList: async () => {
    return axios.get("/api/v1/company/category/list");
  },
  getCategoryAndCategory: async () => {
    return axios.get("api/v1/company/create");
  },
  postCompanyBranch: async (payload: CreateBranchType) => {
    return axios.post("branch", payload);
  },
  getAllBranch: async () => {
    return axios.get("branch");
  },
};
