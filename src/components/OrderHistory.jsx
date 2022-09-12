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
      // console.log(orderList);
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
    <table className="table-auto bg-white rounded-md mt-4 mr-4 ml-4 text-center w-full">
      <caption className="bg-white">Order History</caption>
      <thead className="flex w-full border-b-2">
        <tr className="flex w-full">
          <th className="w-1/3">Warehouse</th>
          <th className="w-1/3">PO Number</th>
          <th className="w-1/3">Delete</th>
        </tr>
      </thead>
      <tbody className="flex flex-col items-center h-[225px] overflow-y-auto">
        {orderList.map((item, i) => {
          return (
            <tr key={i} className="flex shadow-lg w-full">
              <td className="w-1/3 border-r-2 p-2">{item?.warehouse}</td>
              <td className="w-1/3 border-r-2 p-2">{item?.po}</td>
              <td className="w-1/3 border-r-2 p-2">
                <span
                  id={item?.id}
                  onClick={(e) => handleRemoveItem(e.currentTarget.id)}
                  className="cursor-pointer grid place-content-center"
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
  );
};

export default OrderHistory;
