import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";
import { db } from "../firebase";
import FirebaseServices from "../services/FirebaseServices";

const OrderHistory = () => {
  const [orderList, setOrderList] = useState([]);
  const [poSearch, setPoSearch] = useState("");

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
    <div className="bg-white mt-4 mr-4 ml-4 rounded-md shadow-lg w-full">
      {/* <table className="table-auto bg-white mt-4 mr-4 ml-4 text-center w-full"> */}
      <table className="table-auto bg-white text-center w-full">
        <caption className="bg-white rounded-md">Order History</caption>
        <caption className="bg-white w-full">
          <input
            onChange={(e) => setPoSearch(e.target.value)}
            className="text-center border-2 border-black w-full"
            placeholder="Search PO #"
          ></input>
        </caption>
        <thead className="flex w-full border-b-2">
          <tr className="flex w-full">
            <th className="w-1/3">Warehouse</th>
            <th className="w-1/3">PO Number</th>
            <th className="w-1/3">Delete</th>
          </tr>
        </thead>
        <tbody className="flex flex-col items-center h-[235px] overflow-y-auto">
          {orderList
            .filter((item) => {
              return poSearch.toLowerCase() === ""
                ? item
                : item.po.toLowerCase().includes(poSearch.toLowerCase());
            })
            .map((item, i) => {
              return (
                <tr
                  key={i}
                  className="flex shadow-lg w-full hover:bg-slate-300"
                >
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
    </div>
  );
};

export default OrderHistory;
