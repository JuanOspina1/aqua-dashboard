import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useEffect, useState, Fragment } from "react";
import FirebaseServices from "../services/FirebaseServices";

// This can be used as an Edit Quantities option once an actual order form has been created.

const WithdrawItemForm = ({ inventoryItems, whseID }) => {
  // console.log(inventoryItems);
  // console.log(whseInformation);

  ///////////////////////////////
  // Using state makes them persist if we switch warehouse, should probably save this in standard variables
  const [lotNumber, setLotNumber] = useState("");
  const [withdrawQty, setWithdrawQty] = useState(0);

  // Withdraw from the current warehouse
  // Based on the current lot numbers available

  // Select the lot number from the prefilled list
  // Enter the quantity equal to or less than the total amount available.

  const getLotNumberFromDropdown = (e) => {
    e.preventDefault();
    // console.log(e.target);
    // console.log(e.target.text);
    setLotNumber(e.target.text);
  };

  // VALIDATING INPUTS WITH NESTED IF STATEMENT - I need to find out how to stop the function if the if statement fails instead of making an invalid call to firebase

  const withdrawItem = (e) => {
    e.preventDefault();
    // Need to add validation regarding the quantity - must validate quantity only after finding the matching item - withdrawing a negative number adds to the total

    // If statement is happening within the map - it will not stop the outer function - need to return if the alert window happens
    const withdrawnInventoryArr = inventoryItems.map((el, i) => {
      if (el.lotNumber === lotNumber) {
        if (withdrawQty <= el.caseCount) {
          el.caseCount = Number(el.caseCount) - withdrawQty;
          return el;
        } else {
          return alert(
            "The withdraw amount must be equal or less than the quantity available"
          );
        }
      } else return el;
    });

    FirebaseServices.updateQuantities(whseID, withdrawnInventoryArr);
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
      onSubmit={withdrawItem}
      className="grid grid-cols-4 gap-2 ml-4 mr-2 mt-4 border-4 bg-white"
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
              {inventoryItems.map((item, i) => {
                return (
                  <Menu.Item key={i}>
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
      <div>
        <span className="inline-block align-middle mt-2">
          Lot Number: {lotNumber}
        </span>
      </div>
      <input
        onChange={(e) => setWithdrawQty(e.target.value)}
        name="quantity"
        className=" my-2 w-full rouded bg-slate-200"
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
