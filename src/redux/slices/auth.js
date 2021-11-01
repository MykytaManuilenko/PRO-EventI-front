import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  userName: "",
  userRole: "UNREGISTERED",
  user_id: "",
  token: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    registration(state, action) {
      state.isAuthenticated = true;
      state.userName = action.payload.firstName;
      state.userRole = action.payload.role;
      state.user_id = action.payload.userId;
    },
    confirmLogin(state) {
      state.isAuthenticated = true;
      state.userRole = "CONFIRMED_USER";
    },
    logOut(state) {
       state.isAuthenticated = false;
       state.userName = "";
       state.userRole= "";
       state.user_id = "";
      //  state.token = "";
    },
    login(state, action) {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
      state.user_id = action.payload.userId;
      // state.token = action.payload.token;
    },
  },
});

export const authAction = authSlice.actions;
export const confirmLogin = authAction.confirmLogin;

export default authSlice.reducer;
