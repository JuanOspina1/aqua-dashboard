import React, { useState } from "react";
import CreateWhseForm from "../components/CreateWhseForm";
import Sidebar from "../components/Sidebar";
import { FaUserCircle, FaWarehouse } from "react-icons/fa";
import CreateUserForm from "../components/CreateUserForm";

// Get full list of users

// Get full list of warehouses

const WarehouseMgnt = () => {
  const [userForm, setUserform] = useState(false);

  const createNewWarehouse = () => {};

  const controlUserForm = () => {
    setUserform(!userForm);
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

        <div className="grid ml-40">
          <div className="grid grid-cols-2  justify-items-center bg-white rounded-md shadow-lg ml-4 mr-4 pb-4">
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
                  onClick={createNewWarehouse}
                />
              </div>
            </div>
          </div>

          <div className={` ${userForm === true ? "" : "hidden"}`}>
            <CreateUserForm />
          </div>
        </div>
      </div>
    </>
  );
};

// I can apply the bottom once I create the user information in the db - using the user state

{
  /* <div className="grid ">
        <div className="grid grid-cols-2 gap-6">
          <div className="grid grid-cols-2 ml-4 bg-white rounded-md shadow-lg">
            <div className="whse-info">
              <h1 className="font-bold">Warehouse Name</h1>
              <p>{whseInfo?.name}</p>
            </div>

            <div className="whse-info">
              <h1 className="font-bold">Warehouse Address</h1>
              <p>{whseInfo?.address}</p>
            </div>

            <div className="whse-info">
              <h1 className="font-bold">Contact Email</h1>
              <p>{whseInfo?.email}</p>
            </div>

            <div className="whse-info">
              <h1 className="font-bold">Warehouse Phone Number</h1>
              <p>{whseInfo?.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 justify-items-center bg-white rounded-md shadow-lg mr-4">
            {/* When I toggle Hidden, change the title to say: "Return to Inventory" */
}

//       <div className="grid justify-items-center">
//         <span className="font-bold text-xl">Add New Items</span>
//         <div className="">
//           <FaPlusCircle
//             size={50}
//             className="cursor-pointer"
//             onClick={handleAddItemsForm}
//           />
//         </div>
//       </div>

//       <div className="grid justify-items-center">
//         <span className="font-bold text-xl">Withdraw Items</span>
//         <div className="">
//           <FaMinusCircle
//             size={50}
//             className="cursor-pointer"
//             onClick={handleWithdrawForm}
//           />
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className={` ${addItemsForm === true ? "" : "hidden"}`}>
//     <AddItemForm
//       currWhse={whseInfo?.name}
//       key={"itemForm"}
//       handleAddItemClick={handleAddItemsForm}
//     />
//   </div>

//   <div
//     className={` ${
//       withdrawForm === true ? "" : "hidden"
//     } grid grid-cols-2`}
//   >
//     <WithdrawItemForm
//       inventoryItems={inventory}
//       whseInformation={warehouseInfo}
//     />
//   </div>

//   <table
//     className={`table-auto bg-white rounded-md mt-4 mr-4 ml-4
//     ${inventoryForm === true ? "" : "hidden"}`}
//   >
//     <thead className="border-b-2">
//       <tr>
//         <th>Lot Number</th>
//         <th>PO Number</th>
//         <th>Brand</th>
//         <th>Product</th>
//         <th>Size</th>
//         <th>Case Count</th>
//         <th>Weight (LB)</th>
//         <th>Cost Of Goods (LB)</th>
//         <th>Sales Price (LB)</th>
//         <th>Delete Lot</th>
//       </tr>
//     </thead>
//     <tbody className="text-center ">
//       <WarehouseInventory
//         inventoryItems={inventory}
//         whseInformation={warehouseInfo}
//       />
//     </tbody>
//   </table>
// </div> */}

export default WarehouseMgnt;
