import React from "react";
import WarehouseInfo from "../components/warehouseComponents/WarehouseInfo";
import WarehouseSelectBtn from "../components/warehouseComponents/WarehouseSelectBtn";
// Page for displaying warehouses, their information, and their inventories

const Warehouses = () => {
  return (
    <>
      <div className="flex-wrap w-full ml-40">
        <div className="h-auto w-full">
          <h1 className="text-3xl font-bold p-4 text-center">
            Warehouse & Inventory
          </h1>
        </div>

        <div className="grid grid-cols-6 gap-4 m-2">
          <WarehouseSelectBtn />

          {/* SECTION FOR SELECTING WHSE, ITEMS, MODIFICATIONS  */}
        </div>

        <div className="flex-wrap w-full">
          <WarehouseInfo />
        </div>
      </div>
    </>
  );
};

export default Warehouses;
