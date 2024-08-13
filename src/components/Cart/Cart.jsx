import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { login } from "../../store/authSlice";
import axios from "axios";
import RemoveFromCart from "./RemoveFromCart";
import { useDispatch } from "react-redux";
import { featchCart, deleteCartItem } from "../../store/CartSlice";

function Cart() {
  const token = useSelector((state) => state.authentication.access_token);

  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const { items, status, is_error } = useSelector((state) => state.cart_store);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("inside re fetching data");
    dispatch(featchCart());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && !is_error) {
      console.log("inside condition");
      setCartItems(items.cart_item);
      setCartTotal(items.cart_total);
    }
  }, [status, is_error, items]);

  const handelCartitemDelete = async (item_id) => {
    try {
      await dispatch(deleteCartItem(item_id)).unwrap();
      // Refetch the cart after deletion
      dispatch(featchCart());
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  // const handelCartitemDelete = (item_id) => {
  //   console.log(item_id);
  //   dispatch(deleteCartItem(item_id));
  // };

  return (
    <>
      {!token && <h3> Login To Show Your Cart Items </h3>}
      {/* {cartItems && cartItems.length === 0 && <h3> No items</h3>} */}
      {(!cartItems || cartItems.length === 0) && <h3> No items</h3>}
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

                  <a className="btn btn-primary mx-2">Buy Now</a>
                  {/* need to make buy now component which only return a button which has onclik to buy */}
                  <button
                    className="btn btn-primary "
                    onClick={() => handelCartitemDelete(item.product.id)}
                  >
                    {" "}
                    Delete{" "}
                  </button>
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

// console.log(token);

// useEffect(() => {
//   const cart_item = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/cart/", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         console.log(response.data);
//         setCartTotal(response.data.cart_total);
//         setCartItems(response.data.cart_item);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   if (token) {
//     cart_item();
//   }
// }, [token]);

// const handleRemoveFromCart = (removedProductId) => {
//   setCartItems((prevItems) =>
//     prevItems.filter((item) => item.product.id !== removedProductId)
//   );
// };

//   <RemoveFromCart
//   product_id={item.product.id}
//   onRemove={handleRemoveFromCart}
// />
