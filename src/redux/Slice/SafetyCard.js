import { createSlice } from "@reduxjs/toolkit";
import { getAllSafetyThunk } from "redux/Thunks/Thunks";

const initialState = {
  loading: "idle",
  list: [],
  screens: [],
};

export const safetyCardSlice = createSlice({
  name: "safetycard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllSafetyThunk.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllSafetyThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        console.log(action);
        const listData = action.payload.data;
        state.list = listData.reverse();
      })
      .addCase(getAllSafetyThunk.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default safetyCardSlice.reducer;
