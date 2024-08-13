import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import AddressSlice from "./AddressSlice";
import CartSlice from "./CartSlice";

const store = configureStore({
    reducer : {
        "authentication" : authSlice, 
        "address":AddressSlice,
        "cart_store": CartSlice


  

    }
})

export default store;