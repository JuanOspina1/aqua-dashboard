import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderHistory = () => {
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
      success: "Order Deleted",
      error: "Error Deleting Order",
    });
  };

  return (
    <div className="grid">
      <table className="table-auto bg-white rounded-md mt-4 mr-4 ml-4 text-center">
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

export default OrderHistory;
