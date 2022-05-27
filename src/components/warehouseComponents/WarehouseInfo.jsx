import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import WarehouseInventory from "./WarehouseInventory";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
// Displays information about the warehouse
// Warehouse: Name - Address - Contact Email - Contact Number

/*
Function to grab the current warehouse
*/

const WarehouseInfo = () => {
  // I should use this in a separate inventory component based on the state once the warehouse has been selected
  // I can map over the inventory array to generate the fields
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "warehouses", "USA Poultry"), (doc) => {
      setInventory(doc.data()?.Items);
    });
  }, []);

  console.log(inventory);

  // Need to update this to be based on the state once the warehouse has been selected by the user
  const [warehouseInfo, setWarehouseInfo] = useState([]);

  // Effect when something happens

  useEffect(() => {
    onSnapshot(doc(db, "warehouses", "USA Poultry"), (doc) => {
      setWarehouseInfo(doc.data()?.information);
    });
  }, []);
  // Whenever the value in the array changes, use effect changes
  // Empty array only happens on mount

  // Since this is only one warehouse, I need to destructure it to grab the info
  const [whseInfo] = warehouseInfo;

  // Consolidate into the css file once happy with design
  return (
    <>
      {/* I need to make the whse information section mobile responsive */}
      <div className="grid">
        <div className="grid grid-cols-2 w-1/3 ml-4">
          <div className="w-fit h-fit p-4 shadow-lg  rounded-3xl">
            <h1 className="font-bold">Warehouse Name</h1>
            <p>{whseInfo?.name}</p>
          </div>

          <div className="w-fit h-fit p-4 shadow-lg rounded-3xl">
            <h1 className="font-bold">Warehouse Address</h1>
            <p>{whseInfo?.address}</p>
          </div>

          <div className="w-fit h-fit p-4 shadow-lg rounded-3xl">
            <h1 className="font-bold">Contact Email</h1>
            <p>{whseInfo?.email}</p>
          </div>

          <div className="w-fit h-fit p-4 shadow-lg rounded-3xl">
            <h1 className="font-bold">Warehouse Phone Number</h1>
            <p>{whseInfo?.phone}</p>
          </div>
        </div>

        {/* INVENTORY SECTION - REDO USING TABLE LAYOUT*/}
        {/* <div className="grid grid-flow-row auto-rows-max gap-2">
          {inventory.map((item) => (
            <WarehouseInventory item={item} key={item.lotNumber} />
          ))}
        </div> */}

        <table className="table-auto mt-4">
          <thead>
            <tr>
              <th>Lot Number</th>
              <th>PO Number</th>
              <th>Brand</th>
              <th>Product</th>
              <th>Size</th>
              <th>Case Count</th>
              <th>Weight (LB)</th>
              <th>Cost Of Goods (LB)</th>
              <th>Sales Price (LB)</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {inventory.map((item) => {
              return <WarehouseInventory item={item} key={item?.lotNumber} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WarehouseInfo;
