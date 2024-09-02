import React, { useEffect, useState } from "react";
import styles from "./Orders.module.css";
// import OrderSlice from "../../store/OrderSlice";
import { get_all_orders } from "../../store/OrderSlice";
import { useDispatch, useSelector } from "react-redux";

function Orders() {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await dispatch(get_all_orders());
      console.log(response.payload);
      setOrders(response.payload);
    };
    fetchOrders();
  }, [dispatch]);
  const image =
    "https://images.unsplash.com/photo-1725203574074-a33eae85ba71?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <>
      <h1 className={styles.heading}> Your Orders </h1>

      {orders.length > 0 ? (
        orders.map((item, index) => (
          <div className={styles.wrapper}>
            <img ///media/products/images/product_a.jpg
              src={`http://127.0.0.1:8000/${item.product.image}`}
              alt=""
            />
            <div className={styles.details}>
              {" "}
              <strong>{item.product.name}</strong>
              <strong>{item.product.price}</strong>
            </div>
          </div>
        ))
      ) : (
        <p>nothing</p>
      )}
    </>
  );
}

export default Orders;
