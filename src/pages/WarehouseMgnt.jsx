import React, { useState } from "react";
import CreateWhseForm from "../components/CreateWhseForm";
import Sidebar from "../components/Sidebar";
import { FaUserCircle, FaWarehouse } from "react-icons/fa";
import CreateUserForm from "../components/CreateUserForm";
import WarehouseListTable from "../components/WarehouseListTable";

// Get full list of users

// Get full list of warehouses

const WarehouseMgnt = () => {
  const [userForm, setUserform] = useState(false);
  const [whseForm, setWhseform] = useState(false);

  // Fix this logic once the other form has been implemented
  const controlUserForm = () => {
    setUserform(!userForm);
    setWhseform(false);
  };
  const controlWhseForm = () => {
    setWhseform(!whseForm);
    setUserform(false);
  };

  return (
    <>
      <div className="flex-wrap w-full">
        <Sidebar />
        <div className="h-auto w-full">
          <h1 className="text-3xl font-bold p-4 text-center ml-4">
            Warehouse & Inventory Management
          </h1>
        </div>

        <div className="grid grid-cols-2 ml-40">
          <div className="grid grid-cols-2  justify-items-center bg-white  rounded-md shadow-lg ml-4 mr-4 pb-4 w-1/2">
            {/* When I toggle Hidden, change the title to say: "Return to Inventory" */}

            <div className="grid justify-items-center">
              <span className="font-bold text-xl">Create New User</span>
              <div className="">
                <FaUserCircle
                  size={50}
                  className="cursor-pointer"
                  onClick={controlUserForm}
                />
              </div>
            </div>

            <div className="grid justify-items-center">
              <span className="font-bold text-xl pb-2">
                Create New Warehouse
              </span>
              <div className="">
                <FaWarehouse
                  size={50}
                  className="cursor-pointer"
                  onClick={controlWhseForm}
                />
              </div>
            </div>
          </div>

          <div className={` ${userForm === true ? "" : "hidden"}`}>
            <CreateUserForm />
          </div>
          <div className={` ${whseForm === true ? "" : "hidden"}`}>
            <CreateWhseForm />
          </div>
          <div className="w-[100px]">
            <WarehouseListTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default WarehouseMgnt;
