import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import AddressSlice from "./AddressSlice";
import CartSlice from "./CartSlice";
import PaymentSlice from "./PaymentSlice";

const store = configureStore({
  reducer: {
    authentication: authSlice,
    address: AddressSlice,
    cart_store: CartSlice,
    payment: PaymentSlice,
  },
});

export default store;
