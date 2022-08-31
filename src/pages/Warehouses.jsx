import React from "react";
import Sidebar from "../components/Sidebar";
import WarehouseInfo from "../components/WarehouseInfo";
// Page for displaying warehouses, their information, and their inventories

const Warehouses = () => {
  return (
    <>
      <div className="flex">
        <Sidebar className="flex-auto" />
        <div className="flex-auto h-auto ml-40">
          <div>
            <h1 className="text-3xl font-bold p-4 text-center">
              Warehouse & Inventory
            </h1>
          </div>

          <div className="">
            <WarehouseInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default Warehouses;
