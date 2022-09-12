import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaTimesCircle } from "react-icons/fa";
import { db } from "../firebase";
import FirebaseServices from "../services/FirebaseServices";

// Refactor below for Warehouse list in management. I could make this a single reusable component for both warehouse and users in management.

// Logic - need to review how to delete a user. I can delete them and their information based on an ID but need to review logic for actually removing the user from AUTH

const WarehouseListTable = () => {
  // Title for the row
  const [warehouseReference, setWarehouseReference] = useState([]);

  // Array of names
  // Warehouses use information[0].name

  // Listening to multiple docs in a collection

  useEffect(() => {
    const q = query(collection(db, "warehouses"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const warehouses = [];

      querySnapshot.forEach((doc) => {
        warehouses.push({
          name: doc.data().information[0].name,
          id: doc.id,
        });
      });
      setWarehouseReference(warehouses);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleRemoveItem = (whseID) => {
    toast.promise(FirebaseServices.deleteWarehouse(whseID), {
      loading: "Loading",
      success: "Warehouse Deleted",
      error: "Error Deleting Warehouse",
    });
  };

  return (
    <table className="table-auto bg-white rounded-md text-center w-full mt-4 pr-2 ml-4">
      <caption className="bg-white">Active Warehouses</caption>
      <thead className="flex w-full border-b-2">
        <tr className="flex w-full">
          <th className="w-3/4">Warehouses</th>
          <th className="w-1/4">Delete</th>
        </tr>
      </thead>

      <tbody className="flex flex-col overflow-y-auto h-[225px] w-full">
        {warehouseReference.map((item, i) => {
          return (
            <tr key={i} className="flex shadow-lg h-16 w-full">
              <td className="border-r-2 p-2 w-3/4">{item.name}</td>
              <td className="border-r-2 p-2 w-1/4">
                <span
                  id={item.id}
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
  );
};

export default WarehouseListTable;
