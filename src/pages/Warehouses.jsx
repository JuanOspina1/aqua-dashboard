import React from "react";
import Sidebar from "../components/Sidebar";
import WarehouseInfo from "../components/WarehouseInfo";
// Page for displaying warehouses, their information, and their inventories

const Warehouses = () => {
  return (
    <>
      <div className="flex-wrap w-full">
        <Sidebar />
        <div className="h-auto w-full">
          <h1 className="text-3xl font-bold p-4 text-center">
            Warehouse & Inventory
          </h1>
        </div>

        <div className="flex-wrap ml-40">
          <WarehouseInfo />
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <Sidebar />
  //     <div className="flex-wrap w-full ml-40 pr-40">
  //       <div className="h-auto w-full">
  //         <h1 className="text-3xl font-bold p-4 text-center">
  //           Warehouse & Inventory
  //         </h1>
  //       </div>

  //       <div className="flex-wrap w-full">
  //         <WarehouseInfo />
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Warehouses;
