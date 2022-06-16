import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { FaCheckCircle, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import AddItemFormRow from "./AddItemFormRow";

///////////////////////////////////
// WHEN YOU ADD A NEW LINE, IT DELETES THE INFORMATION ON THE PREVIOUS LINES - MAY NEED TO FIND A WAY TO HOLD THE STATE FOR EACH LINE DYNAMICALLY.

const AddItemForm = ({ currWhse }) => {
  // Default rows of 1
  const [formRows, setFormRows] = useState([{ id: 1 }]);

  // Using a normal variable instead of state for adding multiple items
  const newItemsArr = [];

  const addFormRow = (e) => {
    e.preventDefault();
    setFormRows([...formRows, { id: formRows.length + 1 }]);
  };
  // State that controls the current warehouse

  const addItemArrToWhse = async () => {
    const whseRef = doc(db, "warehouses", currWhse);
    await updateDoc(whseRef, {
      Items: arrayUnion(...newItemsArr),
    });
  };

  const createAllItems = (e) => {
    e.preventDefault();
    // console.log(e.target);
    // console.log(e.target.brand);

    formRows.forEach((id, i) => {
      const newItem = {
        brand: e.target.brand[i].value,
        caseCount: e.target.caseCount[i].value,
        caseWeight: e.target.caseWeight[i].value,
        cogs: e.target.cogs[i].value,
        itemName: e.target.itemName[i].value,
        lotNumber: e.target.lotNumber[i].value,
        poNumber: e.target.poNumber[i].value,
        // received: received,
        salesPrice: e.target.salesPrice[i].value,
        size: e.target.size[i].value,
      };

      newItemsArr.push(newItem);
    });
    console.log(newItemsArr);
    addItemArrToWhse(newItemsArr);
  };

  // ATTEMPTING TO MAP EACH ROW AS A COMPONENT SO EACH ROW HAS ITS OWN STATE
  // Issues
  // 1 ) State gets reset when a new row is added, need to track how this is working
  // 2 ) focus is lost in the input field after each key typed

  // return (
  //   /////////////////////////////////
  //   // Consolidate Styling into the CSS sheet
  //   // Need to create input validation ( MOST IMPORTANT: LOT NUMBERS MUST BE UNIQUE - BASIS OF DELETION)

  //   // ATTEMPTING TO MAP EACH ROW AS A COMPONENT SO EACH ROW HAS ITS OWN STATE

  //   <form onSubmit={createAllItems} key={uuidv4()} className="ml-4 mt-4 w-full">
  //     {formRows.map((row) => (
  //       <AddItemFormRow
  //         formRows={formRows}
  //         row={row}
  //         setFormRows={setFormRows}
  //       />
  //     ))}

  //     <button type="submit">
  //       {/* <button onClick={consoleBrandsArr}> */}
  //       <FaCheckCircle className="cursor-pointer" />
  //     </button>
  //     <button onClick={addFormRow}>
  //       <FaPlusCircle className="cursor-pointer" />
  //     </button>
  //   </form>
  // );

  //////////////////////////////////////////////////////////

  return (
    /////////////////////////////////
    // Consolidate Styling into the CSS sheet
    // Need to create input validation ( MOST IMPORTANT: LOT NUMBERS MUST BE UNIQUE - BASIS OF DELETION)

    <form onSubmit={createAllItems} key={uuidv4()} className="ml-4 mt-4 w-full">
      {formRows.map((row) => {
        return (
          <div key={uuidv4()} className="grid grid-cols-11 gap-4">
            <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
              Brand:
              <input
                key={uuidv4()}
                name="brand"
                className=" my-2 w-full rouded "
                type="text"
                placeholder="Brand"
              />
            </label>

            <label key={uuidv4()} className="border-r-2  border-b-2 font-bold">
              Case Count:
              <input
                key={uuidv4()}
                name="caseCount"
                className=" my-2  rouded w-full"
                type="number"
                step="any"
                placeholder="Case Count"
              />
            </label>

            <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
              Case Weight:
              <input
                key={uuidv4()}
                name="caseWeight"
                className=" my-2  rouded w-full"
                type="number"
                step="any"
                placeholder="Case Weight"
              />
            </label>

            <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
              Cost of Goods:
              <input
                key={uuidv4()}
                name="cogs"
                className=" my-2  rouded w-full"
                type="number"
                step="any"
                placeholder="Cost of Goods"
              />
            </label>

            <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
              Item Name:
              <input
                key={uuidv4()}
                name="itemName"
                className=" my-2  rouded w-full"
                type="text"
                placeholder="Item Name"
              />
            </label>

            <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
              Lot Number:
              <input
                key={uuidv4()}
                name="lotNumber"
                className=" my-2  rouded w-full"
                type="text"
                placeholder="Lot Number"
              />
            </label>

            <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
              PO Number:
              <input
                key={uuidv4()}
                name="poNumber"
                className=" my-2  rouded w-full"
                type="text"
                placeholder="PO Number"
              />
            </label>

            <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
              Received:
              <input
                key={uuidv4()}
                name="received"
                className=" my-2  rouded w-full"
                type="Date"
                placeholder="Date Received"
              />
            </label>

            <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
              Sales Price:
              <input
                key={uuidv4()}
                name="salesPrice"
                className=" my-2  rouded w-full"
                type="number"
                step="any"
                placeholder="Sales Price"
              />
            </label>

            <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
              Size:
              <input
                key={uuidv4()}
                name="size"
                className=" my-2  rouded w-full"
                type="text"
                placeholder="Size"
              />
            </label>

            <button
              key={uuidv4()}
              type="button"
              onClick={() =>
                setFormRows(formRows.filter((fr) => fr.id !== row.id))
              }
            >
              <FaTimesCircle className="cursor-pointer" />
            </button>
          </div>
        );
      })}

      <button type="submit">
        {/* <button onClick={consoleBrandsArr}> */}
        <FaCheckCircle className="cursor-pointer" />
      </button>
      <button onClick={addFormRow}>
        <FaPlusCircle className="cursor-pointer" />
      </button>
    </form>
  );
};

export default AddItemForm;
