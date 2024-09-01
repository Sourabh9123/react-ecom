import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  loading: false,
  error: null,
};

export const get_all_orders = createAsyncThunk(
  "get_all_orders",
  async (_, { getState }) => {
    const state = getState();
    const token = state.authentication.access_token;
    console.log(token);
    const url = "http://localhost:8000/api/payment/get-all-orders/";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, { headers });

    return await response.data;
  }
);

const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get_all_orders.pending, (state) => {
      (state.loading = true), (state.error = false);
    });
    builder.addCase(get_all_orders.fulfilled, (state, action) => {
      (state.loading = false), (state.error = false);
    });
  },
});

export default OrderSlice.reducer;
