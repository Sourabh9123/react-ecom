import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

function AddToCart({ product_id }) {
  const token = useSelector((state) => state.authentication.access_token);
  //   console.log(product_id);
  //   console.log(token, " addtocart");

  const handleAddToCart = async () => {
    const url = `http://localhost:8000/api/cart/addcart/${product_id}/`;
    const data = {
      quantity: 1,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url, data, { headers });
    if (response.status === 200) {
      console.log(response);
    }
  };

  return (
    <>
      <button
        onClick={() => handleAddToCart()}
        className="btn btn-danger btn-sm  ms-1"
        style={{
          "--bs-btn-padding-y": ".20rem",
          "--bs-btn-padding-x": ".4rem",
          "--bs-btn-font-size": ".50rem",
        }}
      >
        Add To Cart
      </button>
    </>
  );
}

export default AddToCart;
