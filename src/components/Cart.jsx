import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { login } from "../store/authSlice";
import axios from "axios";

function Cart() {
  const token = useSelector((state) => state.authentication.access_token);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  // console.log(token);

  useEffect(() => {
    const cart_item = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cart/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // console.log(response.data);
          setCartTotal(response.data.cart_total);
          setCartItems(response.data.cart_item);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      cart_item();
    }
  }, [token]);

  console.log(cartTotal);
  console.log(cartItems);

  return (
    <>
      {cartItems.map((item) => {
        return (
          <div className="card " key={item.id} style={{ width: "15rem" }}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{item.product.name}</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Cart;
