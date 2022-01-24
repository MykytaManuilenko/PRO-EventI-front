import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  loading: false,
  errRegister: null,
  successRegister: null,
  errLogIn: null,
  successLogIn: null,
  isOpenAlert: false,
  alert: null,
  isErrReg: false,
  isSucReg: false,
  isSucLogIn: false,
  isErrLogIn: false,
};

const uiSlice = createSlice({
  name: "UI",
  initialState: initialUiState,
  reducers: {
    openAlert(state, action) {
      state.alert = {
        status: action.payload.status,
        message: action.payload.message,
      };
      state.isOpenAlert = true;
    },
    closeAlert(state) {
      state.alert = null;
      state.isOpenAlert = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
