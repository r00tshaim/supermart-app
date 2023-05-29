import { configureStore } from "@reduxjs/toolkit";

//slices
import cartReducer from "./cartSlice"
import userReducer from "./userSlice";
import productsReducer from "./productsSlice"

export const store = configureStore({
  reducer: { 
    cart: cartReducer,
    user: userReducer,
    products: productsReducer,
  },
});