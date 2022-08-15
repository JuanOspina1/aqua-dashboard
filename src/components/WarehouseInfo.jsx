import React, { useEffect, useState, Fragment } from "react";
import { db } from "../firebase";
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
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import WithdrawItemForm from "./WithdrawItemForm";

import AddItemForm1 from "./AddItemForm1";
import FirebaseServices from "../services/FirebaseServices";

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

const WarehouseInfo = () => {
  // List of warehouses in the DB
  const [warehouseCollection, setWarehouseCollection] = useState([]);

  // Current Warehouse we are working in
  const [warehouseInfo, setWarehouseInfo] = useState([]);
  // Inventory of the current warehouse
  const [inventory, setInventory] = useState([]);
  // ID of the current Whse
  const [whseID, setWhseID] = useState("");

  // Togglers
  const [withdrawForm, setWithdrawForm] = useState(false);
  const [inventoryForm, setInventoryForm] = useState(true);
  const [addItemsForm, setAddItemsForm] = useState(false);

  //////////////////////////////

  useEffect(() => {
    const warehouseOptions = [];

    async function getCollectionIDs() {
      const res = await getDocs(collection(db, "warehouses"));

      res.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        warehouseOptions.push({
          name: doc.data().information[0].name,
          id: doc.id,
        });
        // console.log("This is inside the forEach" + warehouseOptions);
      });
      setWarehouseCollection(warehouseOptions);
      // console.log(warehouseOptions);
      // console.log(res.docs[0].data().Items[0]);
      // console.log(res.docs[0].data().information[0]);

      // I have to put these in an array due to previous logic used - deep refactoring may be needed but everything functions properly
      console.log(res.docs[0].data().Items);
      setInventory(res.docs[0].data().Items);
      // setInventory([res.docs[0].data().Items[0]]);
      setWarehouseInfo([res.docs[0].data().information[0]]);
      setWhseID(res.docs[0].id);
      // console.log(warehouseCollection);
    }
    getCollectionIDs();
  }, []);

  //////////////////////////
  // HANDLERS SECTION

  // Currently works to select the warehouse from the dropdown.
  const handleSelectingWarehouse = (selectedWhse) => {
    console.log(selectedWhse);
    onSnapshot(doc(db, "warehouses", selectedWhse), (doc) => {
      setInventory(doc.data()?.Items);
      setWarehouseInfo(doc.data()?.information);
      setWhseID(doc.id);
    });
  };

  const handleWithdrawForm = () => {
    console.log("Withdraw form is clicked");
    setAddItemsForm(false);
    setInventoryForm(true);
    setWithdrawForm(!withdrawForm);
  };

  const handleAddItemsForm = () => {
    console.log("Add Items has been clicked");
    setAddItemsForm(!addItemsForm);
    setInventoryForm(!inventoryForm);
    setWithdrawForm(false);
  };

  // I have to deconstruct this due to old logic - could be refactored but everything works
  const [whseInfo] = warehouseInfo;

  // THIS FUNCTION IS PART OF THE PREBUILT DROPDOWN MENU
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left ml-4 mb-2">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-slate-200 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            Select a Warehouse
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
                  <Menu.Item key={whse.id}>
                    {({ active }) => (
                      <a
                        onClick={(event) =>
                          handleSelectingWarehouse(event.target.dataset.id)
                        }
                        value={whse.id}
                        data-id={whse.id}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        {whse.name}
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
          <div className="grid grid-cols-2 ml-4 bg-white  rounded-md shadow-lg">
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

          <div className="grid grid-cols-2 justify-items-center bg-white rounded-md shadow-lg mr-4">
            {/* When I toggle Hidden, change the title to say: "Return to Inventory" */}

            <div className="grid justify-items-center">
              <span className="font-bold text-xl">Add New Items</span>
              <div className="">
                <FaPlusCircle
                  size={50}
                  className="cursor-pointer"
                  onClick={handleAddItemsForm}
                />
              </div>
            </div>

            <div className="grid justify-items-center">
              <span className="font-bold text-xl">Withdraw Items</span>
              <div className="">
                <FaMinusCircle
                  size={50}
                  className="cursor-pointer"
                  onClick={handleWithdrawForm}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={` ${addItemsForm === true ? "" : "hidden"}`}>
          <AddItemForm1
            currWhse={whseID}
            key={"itemForm"}
            handleAddItemClick={handleAddItemsForm}
          />
        </div>

        <div
          className={` ${
            withdrawForm === true ? "" : "hidden"
          } grid grid-cols-2`}
        >
          <WithdrawItemForm inventoryItems={inventory} whseID={whseID} />
        </div>

        <table
          className={`table-auto bg-white rounded-md mt-4 mr-4 ml-4 
          ${inventoryForm === true ? "" : "hidden"}`}
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
              whseID={whseID}
            />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WarehouseInfo;
