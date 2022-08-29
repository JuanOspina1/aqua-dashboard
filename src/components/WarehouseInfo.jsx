import React, { useEffect, useState, Fragment } from "react";
import { db } from "../firebase";
import WarehouseInventory from "./WarehouseInventory";
import { onSnapshot, collection, query } from "firebase/firestore";
import { FaPlusCircle, FaClipboardList, FaRedoAlt } from "react-icons/fa";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import WithdrawItemForm from "./WithdrawItemForm";

import AddItemForm1 from "./AddItemForm1";

import OrderForm from "./OrderForm";
import NewOrderForm from "./NewOrderForm";

////////////
// Synchrony

////////////////////////////
// ISSUES TO ADDRESS IN DB
// 1) I should create random IDs instead of using the warehouses name - for the logic below, it is based on the ID being exactly the same as the warehouse name - COMPLETED
// 2) Lowercase all fields in the document
// 3) Information for each warehouse should be a map instead of an array
// 4) Is the logic with a useEffect for an initial snapshot correct? Everything works but it may  be worth looking into if there is a better way to reduce this logic.

////////////////////////////
// By default, I want the first warehouse to show so I need to make the initial state based on the first whse in the collection
// State should change based on the selection from the dropdown menu

const WarehouseInfo = () => {
  // List of warehouses in the DB
  const [warehouseCollection, setWarehouseCollection] = useState([]);

  // Current Warehouse we are working in
  const [whseInfo, setWarehouseInfo] = useState([]);
  // Inventory of the current warehouse
  const [inventory, setInventory] = useState([]);
  // ID of the current Whse
  const [whseID, setWhseID] = useState("");

  // Togglers
  const [withdrawForm, setWithdrawForm] = useState(false);
  const [inventoryForm, setInventoryForm] = useState(true);
  const [addItemsForm, setAddItemsForm] = useState(false);
  const [orderForm, setOrderForm] = useState(false);

  //////////////////////////////

  // useEffect for warehouse collections - Initial warehouse loading and initial state - altered based on whseID - onsnapshot unsubs when component unmounts

  useEffect(() => {
    let warehouseOptions = [];

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

  //////////////////////////
  // HANDLERS SECTION

  const handleSelectingWarehouse = (selectedWhse) => {
    // console.log(selectedWhse);
    setWhseID(selectedWhse);
  };

  const handleWithdrawForm = () => {
    // console.log("Withdraw form is clicked");
    setAddItemsForm(false);
    setInventoryForm(true);
    setWithdrawForm(!withdrawForm);
    setOrderForm(false);
  };

  const handleAddItemsForm = () => {
    // console.log("Add Items has been clicked");
    if (orderForm) {
      setInventoryForm(false);
    } else {
      setInventoryForm(!inventoryForm);
    }
    setAddItemsForm(!addItemsForm);
    setWithdrawForm(false);
    setOrderForm(false);
  };

  const handleOrderForm = () => {
    if (addItemsForm) {
      setInventoryForm(false);
    } else {
      setInventoryForm(!inventoryForm);
    }

    setAddItemsForm(false);
    setWithdrawForm(false);

    setOrderForm(!orderForm);
  };

  // I have to deconstruct this due to old logic - could be refactored but everything works
  // CURRENT
  // const [whseInfo] = warehouseInfo;
  // const whseInfo = warehouseInfo;

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

          <div className="grid grid-cols-3 justify-items-center bg-white rounded-md shadow-lg mr-4">
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
              <span className="font-bold text-xl">Update Quantity</span>
              <div className="">
                <FaRedoAlt
                  size={50}
                  className="cursor-pointer"
                  onClick={handleWithdrawForm}
                />
              </div>
            </div>

            <div className="grid justify-items-center">
              <span className="font-bold text-xl">Order Form</span>
              <div className="">
                <FaClipboardList
                  size={50}
                  className="cursor-pointer"
                  onClick={handleOrderForm}
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
              whseInformation={whseInfo}
              whseID={whseID}
            />
          </tbody>
        </table>

        {/* <div className={`w-[700px] ml-[28%] mt-4 ${orderForm ? "" : "hidden"}`}>
          <OrderForm
            warehouseCollection={warehouseCollection}
            handleSelectingWarehouse={handleSelectingWarehouse}
            whseInfo={whseInfo}
            inventory={inventory}
          /> */}

        <div className={`w-full ml-4 mt-4 ${orderForm ? "" : "hidden"}`}>
          <NewOrderForm
            warehouseCollection={warehouseCollection}
            whseID={whseID}
            whseInfo={whseInfo}
            inventory={inventory}
          />
        </div>
      </div>
    </>
  );
};

export default WarehouseInfo;
