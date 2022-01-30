import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanySliceState, CompanyState } from "../../types/companyType";
import { BranchState } from "../../types/branchType";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SavePayloadAction {
  company: CompanyState;
}
interface SaveBranchPayloadAction {
  branches: BranchState[];
}
interface SelectBranchPayloadAction {
  branch: BranchState;
}

interface UpdatePayloadAction {
  company: CompanyState;
}

const initialState = {
  size: "",
  id: "",
  email: "",
  name: "",
  selectedBranch: undefined,
  branches: [],
} as CompanySliceState;

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    saveCompany: (state, action: PayloadAction<SavePayloadAction>) => {
      state.size = action.payload.company.size;
      state.id = action.payload.company.id;
      state.email = action.payload.company.email;
      state.name = action.payload.company.name;
      AsyncStorage.setItem("company_info", JSON.stringify(state));
    },
    clearCompany: (state) => {
      state.size = "";
      state.id = "";
      state.email = "";
      state.name = "";
      state.selectedBranch = undefined;
      state.branches = [];
      AsyncStorage.removeItem("company_info");
    },
    saveCompanyBranch: (
      state,
      action: PayloadAction<SaveBranchPayloadAction>
    ) => {
      state.branches = action.payload.branches;
      AsyncStorage.setItem("company_info", JSON.stringify(state));
    },
    selectBranch: (state, action: PayloadAction<SelectBranchPayloadAction>) => {
      state.selectedBranch = action.payload.branch;
      AsyncStorage.setItem("company_info", JSON.stringify(state));
    },

    updateInfo: (state, action: PayloadAction<UpdatePayloadAction>) => {
      state = { ...state, ...action.payload.company };
      AsyncStorage.setItem("company_info", JSON.stringify(state));
    },
  },
});

export const {
  saveCompany,
  clearCompany,
  updateInfo,
  selectBranch,
  saveCompanyBranch,
} = companySlice.actions;
export default companySlice.reducer;
