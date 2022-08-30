import React, { useState } from "react";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import AddItemFormRow from "./AddItemFormRow";
import FirebaseServices from "../services/FirebaseServices";
import toast from "react-hot-toast";

const AddItemForm1 = ({ currWhse, handleAddItemClick }) => {
  const [formRows, setFormRows] = useState([
    {
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
    },
  ]);

  /// USE THIS FOR THE ROWS - concept provided by Javier
  // Returns a functions that contains the first input within the scope for use until needed

  // Trying to change inputs and add them to the corresponding state
  const onFormRowInputChange = (rowIndex) => (name, value) => {
    // Create copy of the state
    // console.log(rowIndex, name, value);
    let newInput = [...formRows];
    // Find the index of the selected input and then find the matching name
    newInput[rowIndex][name] = value;
    setFormRows(newInput);
  };

  const addFormRow = (e) => {
    e.preventDefault();

    setFormRows([
      ...formRows,
      {
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
      },
    ]);
  };

  const handleSubmit = (e) => {
    // Need to set up validation logic. Loop through the objects array and validate each item.

    e.preventDefault();
    // Create items in firebase

    toast.promise(FirebaseServices.addItemArrToWhse(currWhse, formRows), {
      loading: "Loading",
      success: "Item(s) created",
      error: "Error fetching data",
    });

    // Empty the array once submitted
    setFormRows([
      {
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
      },
    ]);

    // Switch the view back to the items list
    handleAddItemClick();
  };

  return (
    <form onSubmit={handleSubmit} className="ml-4 mt-4 w-full">
      {formRows.map((row, i) => {
        return (
          <AddItemFormRow
            key={i}
            index={i}
            value={row}
            onFormRowInputChange={onFormRowInputChange(i)}
            setFormRows={setFormRows}
            formRows={formRows}
            row={row}
          />
        );
      })}

      <button type="submit">
        <FaCheckCircle className="cursor-pointer" size={40} />
      </button>
      <button onClick={addFormRow}>
        <FaPlusCircle className="cursor-pointer ml-4" size={40} />
      </button>
    </form>
  );
};

export default AddItemForm1;
