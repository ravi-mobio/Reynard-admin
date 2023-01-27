import { createSlice } from "@reduxjs/toolkit";
import { configThunk } from "redux/Thunks/Thunks";

const initialState = {
  loading: "idle",
  refetchConfig: true,
  config: [],
  screens: [],
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(configThunk.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(configThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        console.log(action);
        state.config[0] = action.payload.message;
        state.refetchConfig = false;
      })
      .addCase(configThunk.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default configSlice.reducer;
