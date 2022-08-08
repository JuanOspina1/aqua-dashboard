import React, { useState } from "react";

// Currying

// handle submit -> add items takes an array of items
const FormRow = () => {
  <div key={uuidv4()} className="grid grid-cols-11 gap-4 bg-white">
    <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
      Brand:
      <input
        key={i + 11}
        onChange={handleChange1}
        data-index={i}
        name="brand"
        className=" my-2 w-full rouded "
        type="text"
        placeholder="Brand"
        value={inputs1.brand[i] || ""}
      />
    </label>

    <label key={uuidv4()} className="border-r-2  border-b-2 font-bold">
      Case Count:
      <input
        key={i + 22}
        onChange={handleChange1}
        data-index={i}
        name="caseCount"
        className=" my-2  rouded w-full"
        type="number"
        step="any"
        placeholder="Case Count"
        value={inputs1.caseCount[i] || ""}
      />
    </label>

    <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
      Case Weight:
      <input
        key={i + 33}
        onChange={handleChange1}
        data-index={i}
        name="caseWeight"
        className=" my-2  rouded w-full"
        type="number"
        step="any"
        placeholder="Case Weight"
        value={inputs1.caseWeight[i] || ""}
      />
    </label>

    <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
      Cost of Goods:
      <input
        key={i + 44}
        onChange={handleChange1}
        data-index={i}
        name="cogs"
        className=" my-2  rouded w-full"
        type="number"
        step="any"
        placeholder="Cost of Goods"
        value={inputs1.cogs[i] || ""}
      />
    </label>

    <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
      Item Name:
      <input
        key={i + 55}
        onChange={handleChange1}
        data-index={i}
        name="itemName"
        className=" my-2  rouded w-full"
        type="text"
        placeholder="Item Name"
        value={inputs1.itemName[i] || ""}
      />
    </label>

    <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
      Lot Number:
      <input
        key={i + 66}
        onChange={handleChange1}
        data-index={i}
        name="lotNumber"
        className=" my-2  rouded w-full"
        type="text"
        placeholder="Lot Number"
        value={inputs1.lotNumber[i] || ""}
      />
    </label>

    <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
      PO Number:
      <input
        key={i + 77}
        onChange={handleChange1}
        data-index={i}
        name="poNumber"
        className=" my-2  rouded w-full"
        type="text"
        placeholder="PO Number"
        value={inputs1.poNumber[i] || ""}
      />
    </label>

    <label key={i + 88} className="border-r-2 border-b-2 font-bold">
      Received:
      <input
        key={uuidv4()}
        onChange={handleChange1}
        data-index={i}
        name="received"
        className=" my-2  rouded w-full"
        type="Date"
        placeholder="Date Received"
        value={inputs1.received[i] || ""}
      />
    </label>

    <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
      Sales Price:
      <input
        key={i + 99}
        onChange={handleChange1}
        data-index={i}
        name="salesPrice"
        className=" my-2  rouded w-full"
        type="number"
        step="any"
        placeholder="Sales Price"
        value={inputs1.salesPrice[i] || ""}
      />
    </label>

    <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
      Size:
      <input
        key={i + 100}
        onChange={handleChange1}
        data-index={i}
        name="size"
        className=" my-2  rouded w-full"
        type="text"
        placeholder="Size"
        value={inputs1.size[i] || ""}
      />
    </label>

    <button
      className="border-2"
      key={i + 111}
      type="button"
      onClick={() => setFormRows(formRows.filter((fr) => fr.id !== row.id))}
    >
      <FaTimesCircle className="cursor-pointer fill-red-600" size={40} />
    </button>
  </div>;
};
