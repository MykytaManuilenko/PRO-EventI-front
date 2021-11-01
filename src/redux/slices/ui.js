import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  loading: false,
  err: null,
  success: null,
  isErr: false,
  isSuc: false,
};

const uiSlice = createSlice({
  name: "UI",
  initialState: initialUiState,
  reducers: {
    setError(state, action) {
      state.err = {
        status: action.payload.status,
        message: action.payload.message,
      };
      state.isErr = true;
    },
    unsetError(state) {
      state.err = null;
      state.isErr = false;
    },
    setSuccess(state, action) {
      state.success = {
        status: action.payload.status,
        message: action.payload.message,
      };
      state.isSuc = true;
    },
    unsetSuccess(state) {
      state.success = null;
      state.isSuc = false;
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
