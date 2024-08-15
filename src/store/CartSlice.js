import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  is_error: false,
  error_message: null,
  items: [],
};

export const featchCart = createAsyncThunk(
  "featchCart",
  async (_, { getState }) => {
    const state = getState();
    const token = state.authentication.access_token;
    const url = "http://localhost:8000/api/cart/";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(url, { headers });
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "deleteCartItem",
  async (item_id, { getState }) => {
    const state = getState();
    const token = state.authentication.access_token;

    const url = `http://localhost:8000/api/cart/addcart/${item_id}/`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(url, { headers });
    return response.data;
  }
);

const CartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Featch Cart Data
    builder.addCase(featchCart.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(featchCart.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload;
    });
    builder.addCase(featchCart.rejected, (state, action) => {
      (state.is_error = true), (state.error_message = action.error);
      state.status = "error";
    });

    // Delete Cart Item

    builder.addCase(deleteCartItem.pending, (state, action) => {
      state.is_error = false;
      state.status = "pending";
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.status = "success";
      // state.items = action.payload
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      (state.is_error = true), (state.error_message = action.error);
      state.status = "error";
    });
  },
});

export default CartSlice.reducer;
