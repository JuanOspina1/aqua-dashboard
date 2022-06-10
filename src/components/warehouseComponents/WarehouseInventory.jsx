import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase";

// Delete based on lot number

// I am getting the current state from the parent component but I am also pulling it from the DB
const WarehouseInventory = ({ inventoryItems, whseInformation }) => {
  const [inventory, setInventory] = useState([]);

  // Sort by brand / lot # / case count
  console.log(whseInformation);
  console.log(inventoryItems);

  const items = inventoryItems;
  console.log(items);

  // useEffect(() => {
  //   onSnapshot(doc(db, 'warehouses', warehouseInfo.name), (doc) => {
  //     setInventory(doc.data()?.Items);
  //   });
  // }, []);

  const removeItemFromInv = async (itemLotNumber) => {
    try {
      const [warehouseInfo] = whseInformation;
      const whseRef = doc(db, "warehouses", warehouseInfo.name);
      const result = items.filter(
        (remainingItems) => remainingItems.lotNumber !== itemLotNumber
      );
      await updateDoc(whseRef, {
        Items: result,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //   const deleteShow = async (passedID) => {
  //     try {
  //       const result = movies.filter((item) => item.id !== passedID)
  //       await updateDoc(movieRef, {
  //           savedShows: result
  //       })
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  return (
    <>
      {items.map((item) => {
        return (
          <tr key={uuidv4()} className="shadow-lg mt-4 h-12 hover:h-32">
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
                onClick={(e) => removeItemFromInv(e.currentTarget.id)}
                className="cursor-pointer"
                value={item?.lotNumber}
              >
                <FaTimesCircle />
              </span>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default WarehouseInventory;
