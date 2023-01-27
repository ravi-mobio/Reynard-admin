import { createSlice } from "@reduxjs/toolkit";
import { getAllFieldsThunk } from "redux/Thunks/Thunks";

const initialState = {
  loading: "idle",
  list: {
    dyamicField: [],
    staticField: [],
  },
};

export const dynamicFieldSlice = createSlice({
  name: "dynamicfields",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllFieldsThunk.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllFieldsThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        console.log(action);
        const dynamicListData = action.payload.data.dyamicField;
        state.list.dyamicField = dynamicListData.reverse();
        state.list.staticField = action.payload.data.staticField;
      })
      .addCase(getAllFieldsThunk.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default dynamicFieldSlice.reducer;
