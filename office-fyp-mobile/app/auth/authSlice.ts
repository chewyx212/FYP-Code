import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
  isLoggedIn: boolean;
  token: string;
  user: any;
}

const initialState = {
  isLoggedIn: false,
  token: "",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = "";
      state.user = {};
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("user");
    },
    updateUserInfo: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { login, logout, updateUserInfo } =
  authSlice.actions;
export default authSlice.reducer;
