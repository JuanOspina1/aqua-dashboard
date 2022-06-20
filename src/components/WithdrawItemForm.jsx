import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState, Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";

const WithdrawItemForm = ({ inventoryItems, whseInformation }) => {
  console.log(inventoryItems);
  console.log(whseInformation);

  ///////////////////////////////
  // Using state makes them persist if we switch warehouse, should probably save this in standard variables
  const [lotNumber, setLotNumber] = useState("");
  const [withdrawQty, setWithdrawQty] = useState(0);

  const [currWhse] = whseInformation;
  //   console.log(currWhse);

  // Withdraw from the current warehouse
  // Based on the current lot numbers available

  // Select the lot number from the prefilled list
  // Enter the quantity equal to or less than the total amount available.

  const getLotNumberFromDropdown = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.text);
    setLotNumber(e.target.text);
  };

  // I think I can do most of the below within a map - first validate if it matches the lot number, then update the casecount, this creates a new array that I can send to the db
  const withdrawItem1 = async (e) => {
    try {
      e.preventDefault();
      // Need to add validation regarding the quantity - must validate quantity only after finding the matching item
      const withdrawnInventoryArr = inventoryItems.map((el, i) => {
        if (el.lotNumber === lotNumber) {
          console.log(Number(el.caseCount));
          el.caseCount = Number(el.caseCount) - withdrawQty;
          return el;
        } else return el;
      });

      console.log(withdrawnInventoryArr);
      const whseRef = doc(db, "warehouses", currWhse.name);
      await updateDoc(whseRef, {
        Items: withdrawnInventoryArr,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const withdrawItem = async (e) => {
    try {
      e.preventDefault();

      // Find the index of the item to edit
      const indexPosition = inventoryItems.indexOf(
        (el) => el.lotNumber === lotNumber
      );
      console.log(indexPosition);
      // Filter out the item to edit
      const [itemToChange] = inventoryItems.filter(
        (items) => items.lotNumber === lotNumber
      );
      // Calculate the new qty
      const newQty = itemToChange.caseCount - withdrawQty;
      // Set the caseCount to the new Qty
      itemToChange.caseCount = newQty;
      // Setting a new array to the inventory array - trying to avoid modification to the original array
      const updatedInvArray = inventoryItems;
      // Replace the old object with the new object - NOT replacing at the correct index
      updatedInvArray.splice(indexPosition, 1, itemToChange);
      console.log(updatedInvArray);

      const whseRef = doc(db, "warehouses", currWhse.name);
      //   await updateDoc(whseRef, {
      //     Items: updatedInvArray,
      //   });
    } catch (err) {
      console.error(err);
    }
  };

  // Reset the state based on the whse changing
  useEffect(() => {
    setLotNumber("");
    setWithdrawQty(0);
  }, [inventoryItems]);

  // THIS FUNCTION IS PART OF THE PREBUILT DROPDOWN MENU
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <form
      onSubmit={withdrawItem1}
      className="grid grid-cols-4 gap-2 ml-4 mr-2 mt-4 border-4"
    >
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            Select Lot Number
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
              {inventoryItems.map((item) => {
                return (
                  <Menu.Item key={uuidv4()}>
                    {({ active }) => (
                      <a
                        onClick={getLotNumberFromDropdown}
                        value={item.lotNumber}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        {item.lotNumber}
                      </a>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <span className="inline-block align-middle">Lot Number: {lotNumber}</span>

      <input
        onChange={(e) => setWithdrawQty(e.target.value)}
        name="quantity"
        className=" my-2 w-full rouded"
        type="text"
        placeholder="Quantity"
        value={withdrawQty}
      />

      <button
        type="submit"
        className="rounded-md bg-white border-2 border-rose-600 shadow-sm"
      >
        Withdraw!
      </button>
    </form>
  );
};

export default WithdrawItemForm;
