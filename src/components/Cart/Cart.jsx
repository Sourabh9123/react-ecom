import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import axios from "axios";
import RemoveFromCart from "./RemoveFromCart";

function Cart() {
  const token = useSelector((state) => state.authentication.access_token);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const removeClicked = () => {
    console.log("remove clicked");
  };
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
  }, [token, removeClicked]);

  return (
    <>
      {!token && <h3> Login To Show Your Cart Items </h3>}
      {cartItems.length === 0 && <h3> No items</h3>}
      <div className="container ">
        <div className="row">
          {cartItems.map((item) => {
            return (
              <div
                className="col-3 mb-4"
                key={item.id}
                style={{ width: "17rem" }}
              >
                <img src="image.png" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h6 className="card-title">{item.product.name}</h6>
                  <h6 className="card-title"> &#8377; {item.product.price}</h6>
                  <p className="card-text">{item.product.discription}</p>
                  <button className="btn btn-primary mx-2">Buy Now</button>
                  {/* need to make buy now component which only return a button which has onclik to buy */}
                  <RemoveFromCart
                    product_id={item.product.id}
                    // onRemove={() => removeClicked}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Cart;
