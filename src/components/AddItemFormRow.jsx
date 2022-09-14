import React from "react";
import { FaTimesCircle } from "react-icons/fa";

// Currying

// handle submit -> add items takes an array of items
const AddItemFormRow = ({
  index,
  formRows,
  setFormRows,

  onFormRowInputChange,
}) => {
  // ATTEMPTING TO HANDLE ITEM CREATION IN THE PARENT COMPONENT

  // Removing row based on index
  const removeFormRow = (index) => () => {
    // console.log(index);
    setFormRows(formRows.filter((fr, i) => i !== index));
  };

  return (
    <div className="grid grid-cols-11 gap-4 bg-white">
      <label className="border-r-2 border-b-2 font-bold">
        Brand:
        <input
          key={index + 11}
          onChange={(e) => onFormRowInputChange("brand", e.target.value)}
          name="brand"
          className=" my-2 w-full rouded "
          type="text"
          placeholder="Brand"
          value={formRows[index].brand || ""}
        />
      </label>

      <label className="border-r-2  border-b-2 font-bold">
        Case Count:
        <input
          key={index + 22}
          onChange={(e) => onFormRowInputChange("caseCount", e.target.value)}
          name="caseCount"
          className=" my-2  rouded w-full"
          type="number"
          step="any"
          placeholder="Case Count"
          value={formRows[index].caseCount || ""}
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        Case Weight:
        <input
          key={index + 33}
          onChange={(e) => onFormRowInputChange("caseWeight", e.target.value)}
          name="caseWeight"
          className=" my-2  rouded w-full"
          type="number"
          step="any"
          placeholder="Case Weight"
          value={formRows[index].caseWeight || ""}
          required
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        Cost of Goods:
        <input
          key={index + 44}
          onChange={(e) => onFormRowInputChange("cogs", e.target.value)}
          name="cogs"
          className=" my-2  rouded w-full"
          type="number"
          step="any"
          placeholder="Cost of Goods"
          value={formRows[index].cogs || ""}
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        Item Name:
        <input
          key={index + 55}
          onChange={(e) => onFormRowInputChange("itemName", e.target.value)}
          name="itemName"
          className=" my-2  rouded w-full"
          type="text"
          placeholder="Item Name"
          value={formRows[index].itemName || ""}
          required
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        Lot Number:
        <input
          key={index + 66}
          onChange={(e) => onFormRowInputChange("lotNumber", e.target.value)}
          name="lotNumber"
          className=" my-2  rouded w-full"
          type="text"
          placeholder="Lot Number"
          required
          value={formRows[index].lotNumber || ""}
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        PO Number:
        <input
          key={index + 77}
          onChange={(e) => onFormRowInputChange("poNumber", e.target.value)}
          name="poNumber"
          className=" my-2  rouded w-full"
          type="text"
          placeholder="PO Number"
          value={formRows[index].poNumber || ""}
        />
      </label>

      <label key={index + 88} className="border-r-2 border-b-2 font-bold">
        Received:
        <input
          onChange={(e) => onFormRowInputChange("received", e.target.value)}
          name="received"
          className=" my-2  rouded w-full"
          type="Date"
          placeholder="Date Received"
          value={formRows[index].received || ""}
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        Sales Price:
        <input
          key={index + 99}
          onChange={(e) => onFormRowInputChange("salesPrice", e.target.value)}
          name="salesPrice"
          className=" my-2  rouded w-full"
          type="number"
          step="any"
          placeholder="Sales Price"
          value={formRows[index].salesPrice || ""}
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        Size:
        <input
          key={index + 100}
          onChange={(e) => onFormRowInputChange("size", e.target.value)}
          name="size"
          className=" my-2  rouded w-full"
          type="text"
          placeholder="Size"
          value={formRows[index].size || ""}
          required
        />
      </label>

      <button
        className="border-2"
        key={index + 111}
        type="button"
        onClick={removeFormRow(index)}
      >
        <FaTimesCircle className="cursor-pointer fill-red-600" size={40} />
      </button>
    </div>
  );
};

export default AddItemFormRow;
