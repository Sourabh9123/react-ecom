import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import AddressSlice from "./AddressSlice";

const store = configureStore({
    reducer : {
        "authentication" : authSlice, 
        "address":AddressSlice,
  

    }
})

export default store;