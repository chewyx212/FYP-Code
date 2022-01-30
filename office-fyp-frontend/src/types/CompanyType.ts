import { BranchState } from "./BranchType";

export interface CreateCompanyType {
  name: string;
  email: string;
  size: string;
}
export interface CompanyState {
  id: string;
  name: string;
  email: string;
  size: string;
}

export interface CompanySliceState {
  id: string;
  name: string;
  email: string;
  size: string;
  selectedBranch: string;
  branchs: BranchState[];
}
