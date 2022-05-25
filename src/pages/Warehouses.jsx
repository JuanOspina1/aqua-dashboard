import React from "react";
import WarehouseInfo from "../components/warehouseComponents/WarehouseInfo";
import WarehouseInventory from "../components/warehouseComponents/WarehouseInventory";
// Page for displaying warehouses and their inventories

const Warehouses = () => {
  return (
    <>
      <div className="flex-wrap w-full ml-40">
        <div className="h-auto w-full">
          <h1 className="text-3xl font-bold p-4 text-center">
            Warehouse & Inventory
          </h1>
        </div>

        {/* SECTION FOR SELECTING WHSE, ITEMS, MODIFICATIONS  */}

        <div className="flex-wrap w-full">
          <WarehouseInfo />
        </div>
        <WarehouseInventory />
      </div>
    </>
  );
};

export default Warehouses;
