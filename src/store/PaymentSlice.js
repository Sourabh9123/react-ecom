import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  paymentSuccess: null,
};

export const handle_checkout_payment_success = createAsyncThunk(
  "handle_checkout_payment_success",
  async (payload, { getState }) => {
    const state = getState();
    const token = state.authentication.access_token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    console.log("inside check out handle_checkout_payment_success");

    const url = "http://localhost:8000/api/payment/check-out-success/payment/";
    const response = await axios.post(url, payload, { headers });
    return response.data;
  }
);

export const verify_check_out_payment = createAsyncThunk(
  "verify_check_out_payment",
  async (payload, { getState }) => {
    const state = getState();
    const token = state.authentication.access_token;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const url = "http://localhost:8000/api/payment/check-out-verify-payment/";
    const response = await axios.post(url, payload, { headers });
    return response.data;
  }
);

export const check_out_payment = createAsyncThunk(
  "check_out_payment",
  async (_, { getState }) => {
    const state = getState();
    const token = state.authentication.access_token;
    console.log(token);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    console.log("inside checkout order function");
    const url = "http://localhost:8000/api/payment/check-out-payment/";
    const response = await axios.post(url, {}, { headers });
    return response.data;
  }
);

export const create_order = createAsyncThunk(
  "create_order",
  async (product_id, { getState }) => {
    const state = getState();
    const token = state.authentication.access_token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    console.log("inside create order function");
    const create_order_payload = { id: product_id };
    const url = "http://localhost:8000/api/payment/create/order/";
    const response = await axios.post(url, create_order_payload, { headers });
    return response.data;
  }
);

export const verify_payment = createAsyncThunk(
  "verify_payment",
  async (payment_data, { getState }) => {
    const state = getState();
    const token = state.authentication.access_token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const url_verify = "http://localhost:8000/api/payment/verify/";
    const verifyResponse = await axios.post(url_verify, payment_data, {
      headers,
    });
    return verifyResponse.data;
  }
);

export const handle_payment_success = createAsyncThunk(
  "handle_payment_success",
  async (payment_data, { getState }) => {
    const state = getState();
    const token = state.authentication.access_token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const url_success_payment =
      "http://localhost:8000/api/payment/success/payment/";
    const response_success = await axios.post(
      url_success_payment,
      payment_data,
      { headers }
    );
    return response_success.data;
  }
);

export const handle_payment_failure = createAsyncThunk(
  "handle_payment_failure",
  async (payment_data, { getState }) => {
    const token = getState().authentication.access_token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const url_failure_payment =
      "http://localhost:8000/api/payment/failed/payment/";
    const response_failure = await axios.post(
      url_failure_payment,
      payment_data,
      { headers }
    );
    return response_failure.data;
  }
);

const PaymentSlice = createSlice({
  name: "PaymentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(create_order.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(create_order.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(create_order.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(verify_payment.fulfilled, (state, action) => {
      state.paymentSuccess = action.payload.status === "success";
    });
    builder.addCase(verify_payment.rejected, (state, action) => {
      state.paymentSuccess = false;
      state.error = action.error.message;
    });
  },
});

export default PaymentSlice.reducer;
