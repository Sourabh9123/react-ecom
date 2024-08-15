import React from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

const PaymentComponent = ({ product_id }) => {
  console.log(product_id, "product id");
  const token = useSelector((state) => state.authentication.access_token);
  const handlePayment = async (product_id) => {
    console.log("payment");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const create_order_payload = {
      id: product_id,
    };
    console.log(create_order_payload, "this is id of the product");
    const url = "http://localhost:8000/api/payment/create/order/";
    const response = await axios.post(url, create_order_payload, { headers }); // amount in paisa

    const options = {
      key: response.data.razorpay_key,
      amount: response.data.amount,
      currency: "INR",
      order_id: response.data.order_id,
      notes: response.data.notes,
      handler: async function (response) {
        console.log(response);
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          notes: options.notes,
        };

        const url_verify = "http://localhost:8000/api/payment/verify/";
        const verifyResponse = await axios.post(url_verify, paymentData, {
          headers,
        });

        if (verifyResponse.data.status === "success") {
          // call a function which handels payment success
          alert("Payment successful!");

          const success_data = paymentData;
          const url_success_payment =
            "http://localhost:8000/api/payment/success/payment/";
          const response_success = await axios.post(
            url_success_payment,
            success_data,
            { headers }
          );
          // Handle post-payment actions (e.g., redirect, update UI)
        } else if (verifyResponse.data.status === "failed") {
          // call a function which handel failed payments

          alert("Payment verification failed");
        }
      },
      prefill: {
        name: "Your Name",
        email: "email@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);

    // paymentObject.open();
    paymentObject.on("payment.failed", async function (response) {
      // redirect user from here to another page with error msg
      const res = await axios.post(
        "http://localhost:8000/api/payment/failed/payment/",
        response,
        { headers }
      );
      console.log(response);
      console.log(res);
      alert("Payment failed!");
      alert("Payment failed!");
      alert("Payment failed!");
    });
    paymentObject.open();
  };

  return (
    <div>
      <button onClick={() => handlePayment(product_id)}>
        Pay with Razorpay
      </button>
    </div>
  );
};

export default PaymentComponent;
