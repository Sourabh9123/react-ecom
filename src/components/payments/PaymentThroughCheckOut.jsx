import React from "react";
import { useNavigate } from "react-router-dom";
import {
  handle_payment_failure,
  check_out_payment,
  verify_check_out_payment,
  handle_checkout_payment_success,
} from "../../store/PaymentSlice";

import { useDispatch } from "react-redux";

function PaymentThroughCheckOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePayment = async () => {
    const orderDataResponse = await dispatch(check_out_payment()).unwrap();

    console.log(orderDataResponse);

    const options = {
      key: orderDataResponse.razorpay_key,
      amount: orderDataResponse.amount,
      currency: "INR",
      order_id: orderDataResponse.order_id,
      // notes: {
      //   product_ids: orderDataResponse.notes.product_ids,
      //   price: orderDataResponse.notes.price,
      // },
      handler: async function (response) {
        const payment_data = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          // notes: options.notes,
        };

        const verifyResponse = await dispatch(
          verify_check_out_payment(payment_data)
        ).unwrap(); // here calling verify payment for checkout
        console.log(
          "before calling the handle_checkout_payment_success ",
          verifyResponse
        );
        if (verifyResponse.status === "success") {
          console.log("-------------- before calling handel payment");
          await dispatch(handle_checkout_payment_success(payment_data));
          alert("Payment successful!");
          navigate("/orders");
        } else if (verifyResponse.status === "failed") {
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

    paymentObject.on("payment.failed", async function (response) {
      await dispatch(handle_payment_failure(response));
      alert("Payment failed!");
    });

    paymentObject.open();
  };

  return (
    <div>
      <button
        className="btn btn-danger btn-sm  ms-1"
        style={{
          "--bs-btn-padding-y": ".20rem",
          "--bs-btn-padding-x": ".4rem",
          "--bs-btn-font-size": ".50rem",
        }}
        onClick={() => handlePayment()}
      >
        Buy Now
      </button>
    </div>
  );
}

export default PaymentThroughCheckOut;
