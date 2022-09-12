import React, { useState } from "react";
import { FaUserCircle, FaWarehouse } from "react-icons/fa";
import CreateUserForm from "../components/CreateUserForm";
import CreateWhseForm from "../components/CreateWhseForm";
import OrderHistory from "../components/OrderHistory";
import Sidebar from "../components/Sidebar";
import UserInfo from "../components/UserInfo";
import WarehouseListTable from "../components/WarehouseListTable";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
  const [userForm, setUserform] = useState(false);
  const [whseForm, setWhseform] = useState(true);

  const controlUserForm = () => {
    setUserform(true);
    setWhseform(false);
  };
  const controlWhseForm = () => {
    setWhseform(true);
    setUserform(false);
  };

  const { userInformation } = UserAuth();

  return (
    <>
      <div className="flex w-full">
        <Sidebar className="flex-auto" />
        <div className="ml-40 h-auto w-full">
          <h1 className="text-3xl font-bold p-4 text-center flex-auto">Home</h1>
          <div className="flex">
            <div className="flex w-1/2">
              {/* <UserInfo currentUserInfo={currentUserInfo} /> */}
              <UserInfo currentUserInfo={userInformation} />
            </div>
            <div className="grid grid-cols-2  justify-items-center bg-white  rounded-md shadow-lg ml-4 mr-4 pb-4 w-1/2">
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
          </div>
          <div className="flex">
            <div className="flex w-1/2">
              <WarehouseListTable />
              <OrderHistory />
            </div>

            <div className=" w-1/2">
              <div className={` ${userForm === true ? "" : "hidden"} `}>
                <CreateUserForm />
              </div>
              <div className={` ${whseForm === true ? "" : "hidden"} `}>
                <CreateWhseForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
