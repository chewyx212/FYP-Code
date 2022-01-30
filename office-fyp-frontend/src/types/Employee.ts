import { UserInfoType } from "./AuthType";
export interface EmployeeType {
  id: string;
  email: UserInfoType;
  is_admin: boolean;
}
