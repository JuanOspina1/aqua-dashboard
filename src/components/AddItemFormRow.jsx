import React from "react";
import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

//////////////////////////////////////////////
// This component is currently not in use

const AddItemFormRow = (setFormRows, formRows, row) => {
  const [brand, setBrand] = useState("");
  const [caseCount, setCaseCount] = useState("");
  const [caseWeight, setCaseWeight] = useState("");
  const [cogs, setCogs] = useState("");
  const [itemName, setItemName] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [received, setReceived] = useState("");
  const [salesPrice, setSalesPrice] = useState("");
  const [size, setSize] = useState("");

  /// ERROR: I have to click back into the form field to continue typing
  /// Adding another row still clears all other fields

  return (
    <div key={uuidv4()} className="grid grid-cols-11 gap-4">
      <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
        Brand:
        <input
          onChange={(e) => setBrand(e.target.value)}
          key={uuidv4()}
          name="brand"
          className=" my-2 w-full rouded "
          type="text"
          placeholder="Brand"
          value={brand}
        />
      </label>

      <label key={uuidv4()} className="border-r-2  border-b-2 font-bold">
        Case Count:
        <input
          onChange={(e) => setCaseCount(e.target.value)}
          key={uuidv4()}
          name="caseCount"
          className=" my-2  rouded w-full"
          type="number"
          step="any"
          placeholder="Case Count"
          value={caseCount}
        />
      </label>

      <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
        Case Weight:
        <input
          onChange={(e) => setCaseWeight(e.target.value)}
          key={uuidv4()}
          name="caseWeight"
          className=" my-2  rouded w-full"
          type="number"
          step="any"
          placeholder="Case Weight"
          value={caseWeight}
        />
      </label>

      <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
        Cost of Goods:
        <input
          onChange={(e) => setCogs(e.target.value)}
          key={uuidv4()}
          name="cogs"
          className=" my-2  rouded w-full"
          type="number"
          step="any"
          placeholder="Cost of Goods"
          value={cogs}
        />
      </label>

      <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
        Item Name:
        <input
          onChange={(e) => setItemName(e.target.value)}
          key={uuidv4()}
          name="itemName"
          className=" my-2  rouded w-full"
          type="text"
          placeholder="Item Name"
          value={itemName}
        />
      </label>

      <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
        Lot Number:
        <input
          onChange={(e) => setLotNumber(e.target.value)}
          key={uuidv4()}
          name="lotNumber"
          className=" my-2  rouded w-full"
          type="text"
          placeholder="Lot Number"
          value={lotNumber}
        />
      </label>

      <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
        PO Number:
        <input
          onChange={(e) => setPoNumber(e.target.value)}
          key={uuidv4()}
          name="poNumber"
          className=" my-2  rouded w-full"
          type="text"
          placeholder="PO Number"
          value={poNumber}
        />
      </label>

      <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
        Received:
        <input
          onChange={(e) => setReceived(e.target.value)}
          key={uuidv4()}
          name="received"
          className=" my-2  rouded w-full"
          type="Date"
          placeholder="Date Received"
          value={received}
        />
      </label>

      <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
        Sales Price:
        <input
          onChange={(e) => setSalesPrice(e.target.value)}
          key={uuidv4()}
          name="salesPrice"
          className=" my-2  rouded w-full"
          type="number"
          step="any"
          placeholder="Sales Price"
          value={salesPrice}
        />
      </label>

      <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
        Size:
        <input
          onChange={(e) => setSize(e.target.value)}
          key={uuidv4()}
          name="size"
          className=" my-2  rouded w-full"
          type="text"
          placeholder="Size"
          value={size}
        />
      </label>

      <button
        key={uuidv4()}
        onClick={() => setFormRows(formRows.filter((fr) => fr.id !== row.id))}
      >
        <FaTimesCircle className="cursor-pointer" />
      </button>
    </div>
  );
};

export default AddItemFormRow;
