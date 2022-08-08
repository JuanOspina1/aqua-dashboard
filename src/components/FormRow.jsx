import React, { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";

// Currying

// handle submit -> add items takes an array of items
const FormRow = ({ i, formRows, setFormRows, row, onFormRowChange }) => {
  const [newItem, setNewItem] = useState({
    brand: "",
    caseCount: "",
    caseWeight: "",
    cogs: "",
    itemName: "",
    lotNumber: "",
    poNumber: "",
    received: "",
    salesPrice: "",
    size: "",
  });

  // const removeFormRow = () => {
  //   setFormRows(formRows.filter((fr) => fr.id !== row.id));
  // };

  // Based on index
  const removeFormRow = () => {
    setFormRows(formRows.filter((fr) => fr[i] !== row[i]));
  };

  console.log(formRows);
  // const rowIndex = i;

  return (
    <div className="grid grid-cols-11 gap-4 bg-white">
      <label className="border-r-2 border-b-2 font-bold">
        Brand:
        <input
          key={i + 11}
          // onChange={(e) =>
          //   setNewItem((prevState) => {
          //     return { ...prevState, brand: e.target.value };
          //   })
          // }
          onChange={onFormRowChange(i)}
          data-index={i}
          name="brand"
          className=" my-2 w-full rouded "
          type="text"
          placeholder="Brand"
          value={newItem.brand || ""}
        />
      </label>

      <label className="border-r-2  border-b-2 font-bold">
        Case Count:
        <input
          key={i + 22}
          onChange={(e) =>
            setNewItem((prevState) => {
              return { ...prevState, caseCount: e.target.value };
            })
          }
          data-index={i}
          name="caseCount"
          className=" my-2  rouded w-full"
          type="number"
          step="any"
          placeholder="Case Count"
          value={newItem.caseCount || ""}
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        Case Weight:
        <input
          key={i + 33}
          onChange={(e) =>
            setNewItem((prevState) => {
              return { ...prevState, caseWeight: e.target.value };
            })
          }
          data-index={i}
          name="caseWeight"
          className=" my-2  rouded w-full"
          type="number"
          step="any"
          placeholder="Case Weight"
          value={newItem.caseWeight || ""}
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        Cost of Goods:
        <input
          key={i + 44}
          onChange={(e) =>
            setNewItem((prevState) => {
              return { ...prevState, cogs: e.target.value };
            })
          }
          data-index={i}
          name="cogs"
          className=" my-2  rouded w-full"
          type="number"
          step="any"
          placeholder="Cost of Goods"
          value={newItem.cogs || ""}
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        Item Name:
        <input
          key={i + 55}
          onChange={(e) =>
            setNewItem((prevState) => {
              return { ...prevState, itemName: e.target.value };
            })
          }
          data-index={i}
          name="itemName"
          className=" my-2  rouded w-full"
          type="text"
          placeholder="Item Name"
          value={newItem.itemName || ""}
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        Lot Number:
        <input
          key={i + 66}
          onChange={(e) =>
            setNewItem((prevState) => {
              return { ...prevState, lotNumber: e.target.value };
            })
          }
          data-index={i}
          name="lotNumber"
          className=" my-2  rouded w-full"
          type="text"
          placeholder="Lot Number"
          value={newItem.lotNumber || ""}
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        PO Number:
        <input
          key={i + 77}
          onChange={(e) =>
            setNewItem((prevState) => {
              return { ...prevState, poNumber: e.target.value };
            })
          }
          data-index={i}
          name="poNumber"
          className=" my-2  rouded w-full"
          type="text"
          placeholder="PO Number"
          value={newItem.poNumber || ""}
        />
      </label>

      <label key={i + 88} className="border-r-2 border-b-2 font-bold">
        Received:
        <input
          onChange={(e) =>
            setNewItem((prevState) => {
              return { ...prevState, received: e.target.value };
            })
          }
          data-index={i}
          name="received"
          className=" my-2  rouded w-full"
          type="Date"
          placeholder="Date Received"
          value={newItem.received || ""}
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        Sales Price:
        <input
          key={i + 99}
          onChange={(e) =>
            setNewItem((prevState) => {
              return { ...prevState, salesPrice: e.target.value };
            })
          }
          data-index={i}
          name="salesPrice"
          className=" my-2  rouded w-full"
          type="number"
          step="any"
          placeholder="Sales Price"
          value={newItem.salesPrice || ""}
        />
      </label>

      <label className="border-r-2 border-b-2 font-bold">
        Size:
        <input
          key={i + 100}
          onChange={(e) =>
            setNewItem((prevState) => {
              return { ...prevState, size: e.target.value };
            })
          }
          data-index={i}
          name="size"
          className=" my-2  rouded w-full"
          type="text"
          placeholder="Size"
          value={newItem.size || ""}
        />
      </label>

      <button
        className="border-2"
        key={i + 111}
        type="button"
        onClick={removeFormRow}
      >
        <FaTimesCircle className="cursor-pointer fill-red-600" size={40} />
      </button>
    </div>
  );
};

export default FormRow;
