import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoType } from "types/AuthType";

interface AuthState {
  isLoggedIn: boolean;
  token: string;
  user: UserInfoType;
}
interface LoginPayloadAction {
  token: string;
  user: UserInfoType;
}

interface UpdatePayloadAction {
  user: UserInfoType;
}

const initialState = { isLoggedIn: false, token: "" } as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayloadAction>) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      localStorage.setItem("user_token", action.payload.token);
      localStorage.setItem("user_info", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = "";
      state.isLoggedIn = false;

      localStorage.removeItem("user_token");
      localStorage.removeItem("user_info");
    },
    updateUserInfo: (state, action: PayloadAction<UpdatePayloadAction>) => {
      state.user = action.payload.user;
      localStorage.setItem("user_info", JSON.stringify(action.payload.user));
    },
  },
});

export const { login, logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
