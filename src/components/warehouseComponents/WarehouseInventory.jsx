import React from "react";

const WarehouseInventory = ({ item }) => {
  // Sort by brand / lot # / case count
  return (
    <tr className="shadow-lg mt-4 h-12 hover:h-32">
      <td className="border-r-2">{item?.lotNumber}</td>
      <td className="border-r-2">{item?.poNumber}</td>
      <td className="border-r-2">{item?.brand}</td>
      <td className="border-r-2">{item?.itemName}</td>
      <td className="border-r-2">{item?.size}</td>
      <td className="border-r-2">{item?.caseCount}</td>
      <td className="border-r-2">{item?.caseWeight}</td>
      <td className="border-r-2">{item?.cogs}</td>
      <td>{item?.salesPrice}</td>
    </tr>
  );
};

export default WarehouseInventory;
