import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaTimesCircle, FaSearch } from "react-icons/fa";
import { db } from "../firebase";
import FirebaseServices from "../services/FirebaseServices";

const WarehouseListTable = () => {
  const [warehouseReference, setWarehouseReference] = useState([]);
  const [warehouseSearch, setWarehouseSearch] = useState("");

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
      console.log(warehouseReference);
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
    <div className="bg-white mt-4 ml-4 rounded-md shadow-lg w-full">
      <table className="table-auto bg-white rounded-md text-center w-full border-2 shadow-lg">
        <caption className="bg-white border-x-2 border-y-2">
          Active Warehouses
        </caption>
        <caption className="bg-white border-x-2">
          <input
            placeholder="Search Warehouses"
            className={`text-center border-x-2`}
            onChange={(e) => setWarehouseSearch(e.target.value)}
          ></input>
        </caption>
        <thead className="flex w-full border-b-2">
          <tr className="flex w-full">
            <th className="w-3/4">Warehouses</th>
            <th className="w-1/4">Delete</th>
          </tr>
        </thead>

        <tbody className="flex flex-col overflow-y-auto h-[235px] w-full">
          {warehouseReference
            .filter((item) => {
              return warehouseSearch.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(warehouseSearch);
            })
            .map((item, i) => {
              return (
                <tr key={i} className="flex shadow-lg h-16 w-full">
                  <td className="border-r-2 p-2 w-3/4">{item.name}</td>
                  <td className="border-r-2 p-2 w-1/4">
                    <span
                      id={item.id}
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

export default WarehouseListTable;
