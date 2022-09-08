import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";
import { db } from "../firebase";
import FirebaseServices from "../services/FirebaseServices";

const OrderHistory = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "orders"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const orders = [];

      querySnapshot.forEach((doc) => {
        orders.push({
          warehouse: doc.data().inputs.warehouse,
          po: doc.data().inputs.PO,
          id: doc.id,
        });
      });
      setOrderList(orders);
      console.log(orderList);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleRemoveItem = (orderID) => {
    toast.promise(FirebaseServices.deleteOrder(orderID), {
      loading: "Loading",
      success: "Order Deleted",
      error: "Error Deleting Order",
    });
  };

  return (
    <div className="grid">
      <table className="table-auto bg-white rounded-md mt-4 mr-4 ml-4 text-center">
        <caption>Order History</caption>
        <thead className="border-b-2">
          <tr>
            <th>Warehouse</th>
            <th>PO Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center ">
          {orderList.map((item, i) => {
            return (
              <tr key={i} className="shadow-lg mt-4 h-16">
                <td className="border-r-2">{item?.warehouse}</td>
                <td className="border-r-2">{item?.po}</td>
                <td className="border-r-2 grid justify-items-center ">
                  <span
                    id={item?.id}
                    onClick={(e) => handleRemoveItem(e.currentTarget.id)}
                    className="cursor-pointer"
                    value={item.name}
                  >
                    <FaTimesCircle className="mt-2" size={25} />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
