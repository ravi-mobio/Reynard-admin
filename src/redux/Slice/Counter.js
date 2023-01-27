import { createSlice } from "@reduxjs/toolkit";
import DummyThunk from "../Thunks/Thunks";

const initialState = {
  loading: "idle",
  data: [],
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(DummyThunk.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(DummyThunk.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data.push(action.payload);
      })
      .addCase(DummyThunk.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
