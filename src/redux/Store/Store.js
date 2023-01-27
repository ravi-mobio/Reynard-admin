import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "../Slice/Counter";
import ConfigReducer from "../Slice/Config";
import SafetyCardReducer from "../Slice/SafetyCard";
import DynamicFieldReducer from "../Slice/DynamicFields";

const store = configureStore({
  reducer: {
    counter: CounterReducer,
    config: ConfigReducer,
    safetCard: SafetyCardReducer,
    dynamicFields: DynamicFieldReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
