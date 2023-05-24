import { configureStore } from "@reduxjs/toolkit";

//slices
import cartReducer from "./cartSlice"

export const store = configureStore({
  reducer: { 
    cartReducer,
  },
});