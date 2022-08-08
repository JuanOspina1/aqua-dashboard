import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { FaCheckCircle, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import FormRow from "./FormRow";

///////////////////////////////////
// PENDING TASKS

// I need to work on deleting a row

const AddItemForm1 = ({ currWhse, handleAddItemClick }) => {
  // Default rows of 1 - change id to be index
  //   const [formRows, setFormRows] = useState([{ id: "" }]);

  // Trying out the full object as the state

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

  console.log(formRows);
  /// USE THIS FOR THE ROWS - provided by Javier
  // Returns a functions that contains the input within the scope => need more understanding regarding the use of this function
  // Deleting a row only deletes the last item in the array - need to update this functionality - Javier mentioned the below would help but need to know how.
  const onFormRowChange = (rowIndex) => (values) => {
    let newRows = [...formRows];
    newRows[rowIndex] = values;
    setFormRows(newRows);
    console.log("changed");
  };

  //   const addFormRow = (e) => {
  //     e.preventDefault();
  //     setFormRows([...formRows, { id: "" }]);
  //   };

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
    // Ways to get data

    // 1) by index
    console.log(e.target[11].value);

    // 2) this returns a node list with all of the brands -> I can use this and then create new objects based on the index
    console.log(e.target.elements.brand);
  };

  // Working example to add items
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
            value={row}
            onFormRowChange={onFormRowChange}
            // onChange={onFormRowChange(i)}
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
