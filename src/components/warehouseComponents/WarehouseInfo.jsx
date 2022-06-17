import React, { useEffect, useState, Fragment } from "react";
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
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import AddItemForm from "../AddItemForm";

////////////
// Synchrony

////////////////////////////
// ISSUES TO ADDRESS IN DB
// 1) I should create random IDs instead of using the warehouses name - for the logic below, it is based on the ID being exactly the same as the warehouse name
// 2) Lowercase all fields in the document
// 3) Information for each warehouse should be a map instead of an array

////////////////////////////
// By default, I want the first warehouse to show so I need to make the initial state based on the first whse in the collection
// State should change based on the selection from the dropdown menu
///// Need to find how to return that value from WarehouseSelectBtn
const WarehouseInfo = () => {
  // List of warehouses in the DB
  const [warehouseCollection, setWarehouseCollection] = useState([]);
  const [warehouseInfo, setWarehouseInfo] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [hidden, setHidden] = useState(true);

  //////////////////////////////
  // STATE RESETS TO FIRST WAREHOUSE IN THE ARRAY IF YOU SWITCH PAGES AND COME BACK
  const initialWhseData = async (firstWhse) => {
    const docSnap = await getDoc(doc(db, "warehouses", firstWhse));
    // console.log(
    //   `This is inside initialWhseData:` + JSON.stringify(docSnap.data())
    // );
    // setCurWhse(docSnap.data());
    setWarehouseInfo(docSnap.data()?.information);
    setInventory(docSnap.data()?.Items);
  };

  const getWhseFromDropdown = (e) => {
    e.preventDefault();
    // Target value is not working - could not find the value field upon inspection - using text since it is currently the same as value
    const selectedWhse = e.target.text;
    console.log("you selected" + selectedWhse);
    onSnapshot(doc(db, "warehouses", selectedWhse), (doc) => {
      setInventory(doc.data()?.Items);
      setWarehouseInfo(doc.data()?.information);
    });
  };

  //////////////////////////
  // HANDLERS SECTION

  const handleAddItemClick = () => {
    console.log("I was clicked");
    // This will be used to hide the inventory and present a for to add an item to the current warehouse.
    setHidden(!hidden);
  };

  // Get all warehouses available
  const warehouseOptions = [];
  useEffect(() => {
    async function getCollectionIDs() {
      const res = await getDocs(collection(db, "warehouses"));
      res.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        warehouseOptions.push(doc.data().information[0].name);
        // console.log("This is inside the forEach" + warehouseOptions);
      });
      setWarehouseCollection(warehouseOptions);
      // console.log(warehouseOptions);
      initialWhseData(warehouseOptions[0]);
    }
    getCollectionIDs();
  }, []);

  const [whseInfo] = warehouseInfo;

  // THIS FUNCTION IS PART OF THE PREBUILT DROPDOWN MENU
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            Warehouses
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {warehouseCollection.map((whse) => {
                return (
                  <Menu.Item key={whse}>
                    {({ active }) => (
                      <a
                        onClick={getWhseFromDropdown}
                        value={whse}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        {whse}
                      </a>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* I need to make the whse information section mobile responsive */}
      <div className="grid ">
        <div className="grid grid-cols-2 gap-6">
          <div className="grid grid-cols-2 ml-4 bg-white rounded-md shadow-lg">
            <div className="whse-info">
              <h1 className="font-bold">Warehouse Name</h1>
              <p>{whseInfo?.name}</p>
            </div>

            <div className="whse-info">
              <h1 className="font-bold">Warehouse Address</h1>
              <p>{whseInfo?.address}</p>
            </div>

            <div className="whse-info">
              <h1 className="font-bold">Contact Email</h1>
              <p>{whseInfo?.email}</p>
            </div>

            <div className="whse-info">
              <h1 className="font-bold">Warehouse Phone Number</h1>
              <p>{whseInfo?.phone}</p>
            </div>
          </div>

          <div className="grid justify-items-center bg-white rounded-md shadow-lg mr-4">
            {/* When I toggle Hidden, change the title to say: "Return to Inventory" */}
            <span className="font-bold text-xl">Add New Items</span>
            <div className="">
              <FaPlusCircle
                size={50}
                className="cursor-pointer"
                onClick={handleAddItemClick}
              />
            </div>
          </div>
        </div>
        {/* NEED TO CHANGE BACK TO THE INVENTORY ONCE THE ITEM IS CREATED */}
        <div className={` ${hidden === false ? "" : "hidden"}`}>
          <AddItemForm
            currWhse={whseInfo?.name}
            key={"itemForm"}
            handleAddItemClick={handleAddItemClick}
          />
        </div>

        {/* <form className={`bg-gray-600 ${}`} ></form> */}

        <table
          className={`table-auto bg-white rounded-md mt-4 mr-4 ml-4 
          ${hidden === true ? "" : "hidden"}`}
        >
          <thead className="border-b-2">
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
              <th>Delete Lot</th>
            </tr>
          </thead>
          <tbody className="text-center ">
            <WarehouseInventory
              inventoryItems={inventory}
              whseInformation={warehouseInfo}
            />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WarehouseInfo;
