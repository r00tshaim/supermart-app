import { configureStore } from "@reduxjs/toolkit";

//slices
import cartReducer from "./cartSlice"
import userReducer from "./userSlice";
import inventoryReducer from "./inventorySlice"

export const store = configureStore({
  reducer: { 
    cart: cartReducer,
    user: userReducer,
    inventory: inventoryReducer,
  },
});