import React from "react";
import OrderForm from "../components/OrderForm";
import Sidebar from "../components/Sidebar";
// Page for creating orders

// Need to select warehouse here and send the info to the form component
const orders = () => {
  return (
    <>
      <div className="flex flex-wrap w-full">
        <Sidebar />
        <div className="ml-40">
          <div className="w-[700px] mt-4 ml-4">
            <OrderForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default orders;
