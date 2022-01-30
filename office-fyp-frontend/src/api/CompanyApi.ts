import { CreateCompanyType } from "./../types/CompanyType";

import axios from "utils/axios/AxiosHandler";

export const CompanyApi = {
  getCompanyCategoryList: async () => {
    return axios.get("/api/v1/company/category/list");
  },
  getCategoryAndCategory: async () => {
    return axios.get("api/v1/company/create");
  },
  postCreateCompany: async (payload: CreateCompanyType) => {
    return axios.post("company", payload);
  },
  getCompanyDetail: async () => {
    return axios.get("company");
  },
  EditCompanyDetail: async (company_id: number, formData: CreateCompanyType) => {
    const payload = {
      ...formData,
      _method: 'PUT'
    }
    return axios.post(`api/v1/company/update/${company_id}`, payload);
  },
};
