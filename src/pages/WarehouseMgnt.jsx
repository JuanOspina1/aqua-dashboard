import React from "react";
import CreateWhseForm from "../components/CreateWhseForm";
import Sidebar from "../components/Sidebar";

const WarehouseMgnt = () => {
  return (
    <>
      <Sidebar />
      <div className="flex-wrap w-full ml-40">
        <div className="h-auto w-full">
          <h1 className="text-3xl font-bold p-4 text-center">
            Warehouse & Inventory Management
          </h1>
        </div>
        <CreateWhseForm />
      </div>
    </>
  );
};

export default WarehouseMgnt;
