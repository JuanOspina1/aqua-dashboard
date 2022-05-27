import React from "react";

const WarehouseInventory = ({ item }) => {
  return (
    <div key={item?.lotNumber}>
      <div className="grid grid-cols-10 gap-4 ml-4 mt-4">
        <div className="w-fit h-fit p-4 shadow-lg rounded-3xl row-span-1">
          <h1 className="font-bold">Lot Number</h1>
          <p>{item?.lotNumber}</p>
        </div>

        <div className="w-fit h-fit p-4 shadow-lg rounded-3xl row-span-1">
          <h1 className="font-bold">PO Number</h1>
          <p>{item?.poNumber}</p>
        </div>

        <div className="w-fit h-fit p-4 shadow-lg rounded-3xl row-span-1">
          <h1 className="font-bold">Brand</h1>
          <p>{item?.brand}</p>
        </div>

        <div className="w-fit h-fit p-4 shadow-lg rounded-3xl row-span-1">
          <h1 className="font-bold">Product</h1>
          <p>{item?.itemName}</p>
        </div>

        <div className="w-fit h-fit p-4 shadow-lg rounded-3xl row-span-1">
          <h1 className="font-bold">Size</h1>
          <p>{item?.size}</p>
        </div>

        <div className="w-fit h-fit p-4 shadow-lg rounded-3xl row-span-1">
          <h1 className="font-bold">Case Count</h1>
          <p>{item?.caseCount}</p>
        </div>

        <div className="w-fit h-fit p-4 shadow-lg rounded-3xl row-span-1">
          <h1 className="font-bold">Weight (LB)</h1>
          <p>{item?.caseWeight}</p>
        </div>

        <div className="w-fit h-fit p-4 shadow-lg rounded-3xl row-span-1">
          <h1 className="font-bold">Cost Of Goods (LB)</h1>
          <p>{item?.cogs}</p>
        </div>

        <div className="w-fit h-fit p-4 shadow-lg rounded-3xl row-span-1">
          <h1 className="font-bold">Sales Price (LB)</h1>
          <p>{item?.salesPrice}</p>
        </div>

        {/* <div className="w-fit h-fit p-4 shadow-lg rounded-3xl">
                <h1 className="font-bold">Received Date</h1>
                <p>{item?.received}</p>
              </div> */}
      </div>
    </div>
  );
};

export default WarehouseInventory;
