import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  userName: "",
  userRole: "UNREGISTERED",
  user_id: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    registration(state, action) {
      state.isAuthenticated = true;
      state.userName = action.payload.userName;
      state.userRole = action.payload.role;
      state.user_id = action.payload.userId;
    },
    confirmLogin(state) {
      state.isAuthenticated = true;
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.userName = "";
      state.userRole = "";
      state.user_id = "";
    },
    login(state, action) {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
      state.user_id = action.payload.userId;
    },
  },
});

export const authAction = authSlice.actions;
export const confirmLogin = authAction.confirmLogin;

export default authSlice.reducer;
