import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

function RemoveFromCart({ product_id }) {
  const token = useSelector((state) => state.authentication.access_token);
  console.log(token);
  console.log(product_id);

  const handOnclikRemove = async () => {
    const url = `http://localhost:8000/api/cart/addcart/${product_id}/`;
    const data = {};
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(url, { headers });

    if (response.status === 204) {
      console.log(response);
    }
  };
  return (
    <div>
      <button onClick={handOnclikRemove} className="btn btn-primary mx-2">
        Remove
      </button>
    </div>
  );
}

export default RemoveFromCart;
