import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function RemoveFromCart({ product_id, onRemove }) {
  const token = useSelector((state) => state.authentication.access_token);

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
      onRemove(product_id);
    }
  };

  return (
    <button onClick={handOnclikRemove} className="btn btn-primary mx-2">
      Remove
    </button>
  );
}

export default RemoveFromCart;
