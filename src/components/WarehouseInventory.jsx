import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import FirebaseServices from "../services/FirebaseServices";

// Delete based on lot number

const WarehouseInventory = ({ inventoryItems, whseInformation }) => {
  // Sort by brand / lot # / case count
  // console.log(whseInformation);
  // console.log(inventoryItems);

  const items = inventoryItems;
  // console.log(items);

  const handleRemoveItem = (lotNumber) => {
    FirebaseServices.removeItemFromWhse(lotNumber, whseInformation, items);
  };

  return (
    <>
      {items.map((item, i) => {
        return (
          <tr key={i} className="shadow-lg mt-4 h-16">
            <td className="border-r-2">{item?.lotNumber}</td>
            <td className="border-r-2">{item?.poNumber}</td>
            <td className="border-r-2">{item?.brand}</td>
            <td className="border-r-2">{item?.itemName}</td>
            <td className="border-r-2">{item?.size}</td>
            <td className="border-r-2">{item?.caseCount}</td>
            <td className="border-r-2">{item?.caseWeight}</td>
            <td className="border-r-2">{item?.cogs}</td>
            <td className="border-r-2">{item?.salesPrice}</td>
            <td className="border-r-2 grid justify-items-center ">
              <span
                id={item?.lotNumber}
                onClick={(e) => handleRemoveItem(e.currentTarget.id)}
                className="cursor-pointer"
                value={item?.lotNumber}
              >
                <FaTimesCircle className="mt-2" size={25} />
              </span>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default WarehouseInventory;
