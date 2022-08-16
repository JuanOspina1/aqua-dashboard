import React from "react";

// Refactor below for Warehouse list in management. I could make this a single reusable component for both warehouse and users in management.

// Logic - need to review how to delete a user. I can delete them and their information based on an ID but need to review logic for actually removing the user from AUTH

const CurrentWarehouses = () => {
  return (
    // I can apply the bottom once I create the user information in the db - using the user state
    <div className="grid ">
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
          {/* When I toggle Hidden, change the title to say: "Return to Inventory" */}

          <div className="grid justify-items-center">
            <span className="font-bold text-xl">Add New Items</span>
            <div className="">
              <FaPlusCircle
                size={50}
                className="cursor-pointer"
                onClick={handleAddItemsForm}
              />
            </div>
          </div>

          <div className="grid justify-items-center">
            <span className="font-bold text-xl">Withdraw Items</span>
            <div className="">
              <FaMinusCircle
                size={50}
                className="cursor-pointer"
                onClick={handleWithdrawForm}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={` ${addItemsForm === true ? "" : "hidden"}`}>
        <AddItemForm
          currWhse={whseInfo?.name}
          key={"itemForm"}
          handleAddItemClick={handleAddItemsForm}
        />
      </div>

      <div
        className={` ${withdrawForm === true ? "" : "hidden"} grid grid-cols-2`}
      >
        <WithdrawItemForm
          inventoryItems={inventory}
          whseInformation={warehouseInfo}
        />
      </div>

      <table
        className={`table-auto bg-white rounded-md mt-4 mr-4 ml-4
      ${inventoryForm === true ? "" : "hidden"}`}
      >
        <thead className="border-b-2">
          <tr>
            <th>Lot Number</th>
            <th>PO Number</th>
            <th>Brand</th>
            <th>Product</th>
            <th>Size</th>
            <th>Case Count</th>
            <th>Weight (LB)</th>
            <th>Cost Of Goods (LB)</th>
            <th>Sales Price (LB)</th>
            <th>Delete Lot</th>
          </tr>
        </thead>
        <tbody className="text-center ">
          <WarehouseInventory
            inventoryItems={inventory}
            whseInformation={warehouseInfo}
          />
        </tbody>
      </table>
    </div>
  );
};

export default CurrentWarehouses;
