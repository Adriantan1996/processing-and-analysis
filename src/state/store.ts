import { configureStore } from "@reduxjs/toolkit";
import uploadSlice from "./uploadSlice";
import chartSlice from "./chartSlice";

export const store = configureStore({
  reducer: {
    csv: uploadSlice,
    chart: chartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
