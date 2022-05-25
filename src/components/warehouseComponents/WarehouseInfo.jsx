import React from "react";
// Displays information about the warehouse
// Warehouse: Name - Address - Contact Email - Contact Number

/*
Function to grab the current warehouse
*/

const WarehouseInfo = () => {
  // Consolidate into the css file once happy with design
  return (
    <div className="grid grid-cols-2 gap-6 w-1/3 ml-4">
      <div className="w-fit h-fit p-4 shadow-lg  rounded-3xl">
        <h1 className="font-bold">Warehouse Name</h1>
        <p>Seafrigo Chicago</p>
      </div>

      <div className="w-fit h-fit p-4 shadow-lg rounded-3xl">
        <h1 className="font-bold">Warehouse Address</h1>
        <p>4464 W 44th St, Chicago, IL 60632</p>
      </div>

      <div className="w-fit h-fit p-4 shadow-lg rounded-3xl">
        <h1 className="font-bold">Contact Email</h1>
        <p>seafrigo@seafrigo.com</p>
      </div>

      <div className="w-fit h-fit p-4 shadow-lg rounded-3xl">
        <h1 className="font-bold">Warehouse Phone Number</h1>
        <p>(111) 111-1111</p>
      </div>
    </div>
  );
};

export default WarehouseInfo;
