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
  collectionGroup,
  getDoc,
} from "firebase/firestore";
import { FaPlusCircle } from "react-icons/fa";
import WarehouseSelectBtn from "./WarehouseSelectBtn";

////////////
// Synchrony

////////////////////////////
// ISSUES TO ADDRESS IN DB
// 1) I should create random IDs instead of using the warehouses name
// 2) Lowercase all fields in the document
// 3) Information for each warehouse should be a map instead of an array

////////////////////////////
// By default, I want the first warehouse to show so I need to make the initial state based on the first whse in the collection
// State should change based on the selection from the dropdown menu
///// Need to find how to return that value from WarehouseSelectBtn
const WarehouseInfo = () => {
  const [warehouseCollection, setWarehouseCollection] = useState([]);
  const [curWhse, setCurWhse] = useState({});
  const [warehouseInfo, setWarehouseInfo] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [hidden, setHidden] = useState(true);

  // Setting the initial data is not working, need to find how to make this run after getting the data from the above useEffect after it has filled the array
  const initialWhseData = async () => {
    const docSnap = await getDoc(doc(db, "warehouses", warehouseCollection[0]));
    console.log(
      `This is inside initialWhseData:` + JSON.stringify(docSnap.data())
    );
    setWarehouseInfo(docSnap.data()?.information);
    setInventory(docSnap.data()?.Items);
  };

  // Get all warehouses available
  const warehouseOptions = [];
  useEffect(() => {
    async function getCollectionIDs() {
      const res = await getDocs(collection(db, "warehouses"));
      res.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        warehouseOptions.push(doc.data().information[0].name);
        console.log("This is inside the forEach" + warehouseOptions);
      });
      setWarehouseCollection(warehouseOptions);
    }
    getCollectionIDs();
    // Needs to happen after the array has been filled from the above async function
  }, []);
  // console.log(warehouseCollection);

  // initialWhseData();

  ////////////////////////////////////
  // Current way of handling the initial data - the below will be based on the current warehouse - need to get the inital data above

  // This needs to be based on the selected warehouse from a dropdown
  // useEffect(() => {
  //   onSnapshot(doc(db, "warehouses", warehouseCollection[0]), (doc) => {
  //     setInventory(doc.data()?.Items);
  //   });
  // }, []);

  // // console.log(inventory);

  // useEffect(() => {
  //   onSnapshot(doc(db, "warehouses", warehouseCollection[0]), (doc) => {
  //     setWarehouseInfo(doc.data()?.information);
  //   });
  // }, []);
  // Since this is only one warehouse, I need to destructure it to grab the info

  const [whseInfo] = warehouseInfo;
  // console.log(warehouseInfo);

  const handleAddItemClick = () => {
    // This will be used to hide the inventory and present a for to add an item to the current warehouse.
    setHidden(!hidden);
  };

  return (
    <>
      <div className="grid grid-cols-6 gap-4 m-2">
        <WarehouseSelectBtn
          whseArr={warehouseCollection}
          key={"whseSelector"}
        />
      </div>
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
