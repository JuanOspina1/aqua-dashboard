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
    // I can apply the bottom once I create the user information in the db - using the user state
    <div className="grid ">
      <table className="table-auto bg-white rounded-md mt-4 mr-4 ml-4">
        <thead className="border-b-2">
          <tr>
            <th>Active Warehouses</th>
          </tr>
        </thead>
        <tbody className="text-center ">
          {warehouseReference.map((item, i) => {
            return (
              <tr key={i} className="shadow-lg mt-4 h-16">
                <td className="border-r-2">{item.name}</td>
                <td className="border-r-2 grid justify-items-center ">
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
    </div>
  );
};

export default WarehouseListTable;
