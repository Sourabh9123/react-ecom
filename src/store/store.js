import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import AddressSlice from "./AddressSlice";
import CartSlice from "./CartSlice";
import PaymentSlice from "./PaymentSlice";

import OrderSlice from "./OrderSlice";

const store = configureStore({
  reducer: {
    authentication: authSlice,
    address: AddressSlice,
    cart_store: CartSlice,
    payment: PaymentSlice,
    orders: OrderSlice,
  },
});

export default store;
