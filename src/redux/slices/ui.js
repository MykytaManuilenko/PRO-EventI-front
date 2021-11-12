import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  loading: false,
  errRegister: null,
  successRegister: null,
  errLogIn: null,
  successLogIn: null,
  isErrReg: false,
  isSucReg: false,
  isSucLogIn: false,
  isErrLogIn: false,
};

const uiSlice = createSlice({
  name: "UI",
  initialState: initialUiState,
  reducers: {
    setErrorRegister(state, action) {
      state.errRegister = {
        status: action.payload.status,
        message: action.payload.message,
      };
      state.isErrReg = true;
    },
    unsetErrorRegister(state) {
      state.errRegister = null;
      state.isErrReg = false;
    },
    setSuccessRegister(state, action) {
      state.successRegister = {
        status: action.payload.status,
        message: action.payload.message,
      };
      state.isSucReg = true;
    },
    unsetSuccessRegister(state) {
      state.successRegister = null;
      state.isSucReg = false;
    },
    setErrorLogIn(state, action) {
      state.errLogIn = {
        status: action.payload.status,
        message: action.payload.message,
      };
      state.isErrLogIn = true;
    },
    unsetErrorLogIn(state) {
      state.errLogIn = null;
      state.isErrLogIn = false;
    },
    setSuccessLogIn(state, action) {
      state.successLogIn = {
        status: action.payload.status,
        message: action.payload.message,
      };
      state.isSucLogIn = true;
    },
    unsetSuccessLogIn(state) {
      state.successLogIn = null;
      state.isSucLogIn = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
