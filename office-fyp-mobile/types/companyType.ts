import { BranchState } from "./branchType";

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
  selectedBranch: BranchState | undefined;
  branches: BranchState[];
}
