import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReleaseForm from "../components/ReleaseForm";
import Sidebar from "../components/Sidebar";
import WarehouseInventory from "../components/WarehouseInventory";
import { db } from "../firebase";
// Page for creating orders

// Need to select warehouse here and send the info to the form component
const Orders = () => {
  const [warehouseCollection, setWarehouseCollection] = useState([]);

  // Current Warehouse we are working in
  const [whseInfo, setWarehouseInfo] = useState([]);
  // Inventory of the current warehouse
  const [inventory, setInventory] = useState([]);
  // ID of the current Whse
  const [whseID, setWhseID] = useState("");

  //////////////////////////////

  // useEffect for warehouse collections - Initial warehouse loading and initial state - altered based on whseID - onsnapshot unsubs when component unmounts

  useEffect(() => {
    let warehouseOptions = [];
    console.log("useEffect running in orders");
    const q = query(collection(db, "warehouses"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // Clear the warehouse array so they do not duplicate in the dropdown menu
      warehouseOptions = [];
      querySnapshot.forEach((doc) => {
        warehouseOptions.push({
          name: doc.data().information[0].name,
          id: doc.id,
        });
        setWarehouseCollection(warehouseOptions);
      });

      // if whseID is empty, fill in the initial data
      if (whseID === "") {
        setWhseID(querySnapshot.docs[0].id);
      }

      if (whseID !== "") {
        // console.log(querySnapshot.docs);
        const selectedWhse = querySnapshot.docs.find(
          (doc) => doc.id === whseID
        );
        // console.log(selectedWhse);
        setWarehouseInfo(selectedWhse?.data().information[0]);
        setInventory(selectedWhse?.data().Items);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [whseID]);

  const handleSelectingWarehouse = (selectedWhse) => {
    console.log(selectedWhse);
    setWhseID(selectedWhse);
  };

  return (
    <>
      <div className="flex flex-wrap w-full">
        <Sidebar />
        <div className="ml-40">
          <div className="flex">
            <div className="w-[700px] mt-4 ml-4">
              {/* <ReleaseForm
                warehouseCollection={warehouseCollection}
                handleSelectingWarehouse={handleSelectingWarehouse}
                whseInfo={whseInfo}
                inventory={inventory}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
