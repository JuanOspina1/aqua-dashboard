import React, { useState } from "react";
import { FaCheckCircle, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import FormRow from "./FormRow";
import FirebaseServices from "../services/FirebaseServices";

///////////////////////////////////
// PENDING TASKS

// 1) BUSINESS LOGIC

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

  /// USE THIS FOR THE ROWS - provided by Javier
  // Returns a functions that contains the first input within the scope for use until needed
  // const onFormRowChange = (rowIndex) => (values) => {
  //   let newRows = [...formRows];
  //   newRows[rowIndex] = values;
  //   setFormRows(newRows);
  //   console.log("changed");
  // };

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

  // loop over formrows array to create objects at each index - the amount of total items(objects) should be equal to the total form rows
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create items in firebase
    FirebaseServices.addItemArrToWhse(currWhse, formRows);

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

  // Working example to add items - put this in the business logice when applicable.
  //   const addItemArrToWhse = async () => {
  //     const whseRef = doc(db, "warehouses", currWhse);
  //     await updateDoc(whseRef, {
  //       Items: arrayUnion(...newItemsArr),
  //     });
  //   };

  return (
    <form onSubmit={handleSubmit} className="ml-4 mt-4 w-full">
      {formRows.map((row, i) => {
        return (
          <FormRow
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
