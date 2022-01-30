export interface PlatformListType {
  id: number;
  name: string;
  image: string;
  status: string;
}

export interface CreateStoreRequiredFormType {
  company_id: number;
  country_id: number;
  name: string;
  store_platform_id: number;
  store_url: string;
  app_name: string;
  return_url: string;
  scope: string;
}

export interface ActiveFormType {
  id: number;
  display_name: string;
  input_type: string;
  input_type_name: string;
  value: string;
  key: string;
  store_platform_id: number;
  storable: boolean;
  customizable: boolean;
}

export interface StoreDetailType {
  id: number;
  company_id: number;
  country_id: number;
  country_name: string;
  description: string;
  name: string;
  status: string;
  store_code: string;
  store_platform: {
    id: number;
    name: string;
    email: string;
    phone_number: string;
  };
  url: string;
}
