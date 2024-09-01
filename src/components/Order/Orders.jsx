import React, { useEffect, useState } from "react";
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
    };
    fetchOrders();
  }, [dispatch]);
  return <div>Orders</div>;
}

export default Orders;
