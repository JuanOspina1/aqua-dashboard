import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import WarehouseInventory from "./WarehouseInventory";
import {
  updateDoc,
  doc,
  onSnapshot,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { FaPlusCircle } from "react-icons/fa";

////////////////////////////
// ISSUES TO ADDRESS IN DB
// 1) I should create random IDs instead of using the warehouses name
// 2) Lowercase all fields in the document
// 3) Information for each warehouse should be a map instead of an array

const WarehouseInfo = () => {
  const [warehouseCollection, setWarehouseCollection] = useState([]);
  const [warehouseInfo, setWarehouseInfo] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [hidden, setHidden] = useState(true);
  const warehouseOptions = [];

  useEffect(() => {
    async function getCollectionIDs() {
      const res = await getDocs(collection(db, "warehouses"));
      res.forEach((doc) => {
        console.log(doc.id, "=>", doc.data().information[0].name);
        warehouseOptions.push(doc.data().information[0].name);
      });
    }
    getCollectionIDs();
    console.log(warehouseOptions);
  }, []);

  // This needs to be based on the selected warehouse from a dropdown
  useEffect(() => {
    onSnapshot(doc(db, "warehouses", "USA Poultry"), (doc) => {
      setInventory(doc.data()?.Items);
    });
  }, []);

  // console.log(inventory);

  useEffect(() => {
    onSnapshot(doc(db, "warehouses", "USA Poultry"), (doc) => {
      setWarehouseInfo(doc.data()?.information);
    });
  }, []);
  // Since this is only one warehouse, I need to destructure it to grab the info
  const [whseInfo] = warehouseInfo;

  const handleAddItemClick = () => {
    // This will be used to hide the inventory and present a for to add an item to the current warehouse.
    setHidden(!hidden);
  };

  return (
    <>
      {/* I need to make the whse information section mobile responsive */}
      <div className="grid">
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-2 ml-4">
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

          <div className="grid justify-items-center">
            <span className="font-bold text-xl">Add a New Item</span>
            <div className="">
              <FaPlusCircle
                size={50}
                className="cursor-pointer"
                onClick={handleAddItemClick}
              />
            </div>
          </div>
        </div>

        <h1 className={`bg-gray-600 ${hidden === false ? "" : "hidden"}`}>
          TESTING HIDDEN
        </h1>

        {/* <form className={`bg-gray-600 ${}`} ></form> */}

        <table className={`table-auto mt-4 ${hidden === true ? "" : "hidden"}`}>
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
