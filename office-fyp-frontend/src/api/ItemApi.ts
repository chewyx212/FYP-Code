
import axios from "utils/axios/AxiosHandler";

export const ItemApi = {
  getWCItemList: async () => {
    return axios.get("/api/v1/item/wc/product/list");
  },
  getWCItemVariationList: async () => {
    return axios.get("/api/v1/item/wc/product/1/variation/list");
  },
  getWCItemAttributeList: async () => {
    return axios.get("/api/v1/item/wc/product/attribute/list");
  },
  getWCItemAttributeTermList: async () => {
    return axios.get("/api.v1/item/wc/product/attribute/2/term/list");
  },
  getWCItemCategoryList: async () => {
    return axios.get("/api/v1/item/wc/product/category/list");
  },
  getWCItemShippingClassList: async () => {
    return axios.get("/api/v1/item/wc/product/shipping_class/list");
  },
  getWCItemTagList: async () => {
    return axios.get("/api/v1/item/wc/product/tag/list");
  },
  getWCItemReviewList: async () => {
    return axios.get("/api/v1/item/wc/product/review/list");
  },
};
