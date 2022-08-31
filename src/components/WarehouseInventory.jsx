import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import FirebaseServices from "../services/FirebaseServices";
import toast from "react-hot-toast";

// Delete based on lot number

const WarehouseInventory = ({ whseID, inventoryItems, search }) => {
  // Sort by brand / lot # / case count
  console.log(search);

  const handleRemoveItem = (lotNumber) => {
    toast.promise(
      FirebaseServices.removeItemFromWhse(lotNumber, inventoryItems, whseID),

      {
        loading: "Loading",
        success: "Item deleted!",
        error: "Error deleting",
      }
    );
  };

  return (
    <>
      {inventoryItems
        .filter((item) => {
          return search.toLowerCase() === ""
            ? item
            : item.itemName.toLowerCase().includes(search);
        })
        .map((item, i) => {
          return (
            <tr key={i} className="shadow-lg mt-4 h-16">
              <td className="border-r-2">{item?.lotNumber}</td>
              <td className="border-r-2">{item?.poNumber}</td>
              <td className="border-r-2">{item?.brand}</td>
              <td className="border-r-2">{item?.itemName}</td>
              <td className="border-r-2">{item?.size}</td>
              <td className="border-r-2">{+item?.caseCount}</td>
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

  /////////////////////////////////////////////////////
  // WORKING WITHOUT SEARCH
  // return (
  //   <>
  //     {inventoryItems.map((item, i) => {
  //       return (
  //         <tr key={i} className="shadow-lg mt-4 h-16">
  //           <td className="border-r-2">{item?.lotNumber}</td>
  //           <td className="border-r-2">{item?.poNumber}</td>
  //           <td className="border-r-2">{item?.brand}</td>
  //           <td className="border-r-2">{item?.itemName}</td>
  //           <td className="border-r-2">{item?.size}</td>
  //           <td className="border-r-2">{+item?.caseCount}</td>
  //           <td className="border-r-2">{item?.caseWeight}</td>
  //           <td className="border-r-2">{item?.cogs}</td>
  //           <td className="border-r-2">{item?.salesPrice}</td>
  //           <td className="border-r-2 grid justify-items-center ">
  //             <span
  //               id={item?.lotNumber}
  //               onClick={(e) => handleRemoveItem(e.currentTarget.id)}
  //               className="cursor-pointer"
  //               value={item?.lotNumber}
  //             >
  //               <FaTimesCircle className="mt-2" size={25} />
  //             </span>
  //           </td>
  //         </tr>
  //       );
  //     })}
  //   </>
  // );
};

export default WarehouseInventory;
