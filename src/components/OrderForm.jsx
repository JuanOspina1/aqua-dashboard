import React, { useState } from "react";
import AquaLogo from "../images/small-aqua-logo.PNG";
import OrderFormRow from "./OrderFormRow";

const OrderForm = ({
  warehouseCollection,
  handleSelectingWarehouse,
  whseInfo,
  inventory,
}) => {
  const [formRowData, setFormRowData] = useState([
    {
      caseCount: 0,
      lotNumber: "",
    },
    {
      caseCount: 0,
      lotNumber: "",
    },
    {
      caseCount: 0,
      lotNumber: "",
    },
    {
      caseCount: 0,
      lotNumber: "",
    },
    {
      caseCount: 0,
      lotNumber: "",
    },
    {
      caseCount: 0,
      lotNumber: "",
    },
    {
      caseCount: 0,
      lotNumber: "",
    },
    {
      caseCount: 0,
      lotNumber: "",
    },
    {
      caseCount: 0,
      lotNumber: "",
    },
  ]);

  const onFormRowInputChange = (rowIndex) => (name, value) => {
    // Create copy of the state
    // console.log(rowIndex, name, value);
    let newInput = [...formRowData];
    // Find the index of the selected input and then find the matching name
    newInput[rowIndex][name] = value;
    setFormRowData(newInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formRowData);
  };

  return (
    <form
      className="w-full border border-black bg-white"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="flex w-full">
        <img
          src={AquaLogo}
          alt="Logo"
          className="w-1/2 bg-white  border-b border-r border-black mr-2"
        />

        <div className="w-1/2 bg-white  text-center border-l border-b border-black">
          <h1 className="border-b border-black">Cold Storage:</h1>
          <select
            className="bg-white"
            onChange={(e) => handleSelectingWarehouse(e.target.value)}
          >
            {warehouseCollection.map((warehouse) => {
              return (
                <option
                  className="text-center"
                  key={warehouse.name}
                  value={warehouse.id}
                  data-id={warehouse.id}
                >
                  {warehouse.name}
                </option>
              );
            })}
          </select>
          <p>{whseInfo.address}</p>
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-1/2 bg-white h-8 text-center border-r border-b border-black mr-2">
          Release To:
        </div>
        <div className="w-1/2 bg-white h-8 text-center border-l border-b border-black">
          Consignee:
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-1/2 bg-[#dbe5f1] h-20 text-center border-b border-r border-black mr-2">
          <textarea
            placeholder="Enter Carrier Name"
            className="bg-[#dbe5f1] text-center w-full h-full"
          ></textarea>
        </div>

        <div className="w-1/2 bg-[#b7e1cd] h-20 text-center border-b border-l border-black">
          <textarea
            placeholder="Enter Consignee Name"
            className="bg-[#b7e1cd] text-center w-full h-full"
          ></textarea>
        </div>
      </div>

      {/* ORDER INFORMATION  */}
      <div className="flex w-full mt-2 text-center border-t border-b border-black bg-[#dbe5f1]">
        <div className="border-r border-black">
          <h1>PO Number</h1>
          <input
            type="text"
            placeholder="PO Number"
            className="text-center bg-[#dbe5f1]"
          ></input>
        </div>

        <div className="border-r border-black">
          <h1>Release Date:</h1>
          <input type="date" className="text-center bg-[#dbe5f1]"></input>
        </div>

        <div className="border-r border-black w-36 ml-2">
          <h1 className="w-max">Release on Pallets</h1>
          <select className="bg-[#dbe5f1]">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="border-r border-black w-32">
          <h1># of Pallets</h1>
          <input
            type="number"
            min="0"
            placeholder="0"
            className="text-center bg-[#dbe5f1] w-full"
          ></input>
        </div>

        <div className="ml-2">
          <h1>Rep</h1>
          <p>Team 1</p>
        </div>
      </div>

      {/*  ITEM FORM LABELS */}
      <div className="flex w-full text-center bg-white border-b border-black">
        <div className="w-[20%] border-r  border-black">Lot Number</div>

        <div className="w-[12.5%] border-r border-black">Cases</div>

        <div className="w-[50%] border-r border-black">Description</div>

        <div className="w-[12.5%]">Net Weight</div>
      </div>

      {/* ITEM FORM ROWS - I WANT A DEFAULT OF 9 - EVERY OTHER ROW CHANGES COLOR */}
      <OrderFormRow
        id={0}
        inventory={inventory}
        onFormRowInputChange={onFormRowInputChange(0)}
      />
      <OrderFormRow
        id={1}
        inventory={inventory}
        onFormRowInputChange={onFormRowInputChange(1)}
      />
      <OrderFormRow
        id={2}
        inventory={inventory}
        onFormRowInputChange={onFormRowInputChange(2)}
      />
      <OrderFormRow
        id={3}
        inventory={inventory}
        onFormRowInputChange={onFormRowInputChange(3)}
      />
      <OrderFormRow
        id={4}
        inventory={inventory}
        onFormRowInputChange={onFormRowInputChange(4)}
      />
      <OrderFormRow
        id={5}
        inventory={inventory}
        onFormRowInputChange={onFormRowInputChange(5)}
      />
      <OrderFormRow
        id={6}
        inventory={inventory}
        onFormRowInputChange={onFormRowInputChange(6)}
      />
      <OrderFormRow
        id={7}
        inventory={inventory}
        onFormRowInputChange={onFormRowInputChange(7)}
      />
      <OrderFormRow
        id={8}
        inventory={inventory}
        onFormRowInputChange={onFormRowInputChange(8)}
      />

      <button className="w-1/2 bg-red-500">Clear Order</button>
      <button className="w-1/2 bg-green-500" type="submit">
        Submit Order
      </button>
    </form>
  );
};

export default OrderForm;
