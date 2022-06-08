import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { FaCheckCircle, FaPlusCircle, FaTimesCircle } from "react-icons/fa";

const AddItemForm = ({ currWhse }) => {
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

  // Default rows of 1
  const [formRows, setFormRows] = useState([{ id: 1 }]);

  // I need to be able to create items for each row - I may not be able to use the state for this - maybe I can create an object for each item, then push each item into an array in the state and then array UNION in the DB
  const addFormRow = (e) => {
    e.preventDefault();
    setFormRows([...formRows, { id: formRows.length + 1 }]);
  };
  // State that controls the current warehouse
  console.log(currWhse);

  // Push items to the DB
  const addItemToWhse = async (newItem) => {
    console.log(newItem);
    const whseRef = doc(db, "warehouses", currWhse);
    await updateDoc(whseRef, {
      Items: arrayUnion(newItem),
    });
    setBrand("");
    setCaseCount("");
    setCaseWeight("");
    setCogs("");
    setItemName("");
    setLotNumber("");
    setPoNumber("");
    setReceived("");
    setSalesPrice("");
    setSize("");
  };

  // I might want to allow the default action upon submission - I need to see how this interacts.
  const createItem = (e) => {
    e.preventDefault();

    const newItem = {
      brand: brand,
      caseCount: +caseCount,
      caseWeight: +caseWeight,
      cogs: +cogs,
      itemName: itemName,
      lotNumber: lotNumber,
      poNumber: poNumber,
      // received: received,
      salesPrice: +salesPrice,
      size: size,
    };
    console.log(newItem);

    addItemToWhse(newItem);
  };

  return (
    /////////////////////////////////
    // Create independent Item for each row
    // Consolidate Styling into the CSS sheet
    // Need to create input validation
    //

    <form
      onSubmit={createItem}
      className="grid grid-cols-11 gap-4 ml-4 mt-4 w-full"
    >
      {formRows.map((row) => (
        <>
          <label className="border-r-2 border-b-2 font-bold">
            Brand:
            <input
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              className=" my-2 w-full rouded "
              type="text"
              placeholder="Brand"
            />
          </label>

          <label className="border-r-2  border-b-2 font-bold">
            Case Count:
            <input
              onChange={(e) => setCaseCount(e.target.value)}
              className=" my-2  rouded w-full"
              type="number"
              step="any"
              placeholder="Case Count"
            />
          </label>

          <label className="border-r-2 border-b-2 font-bold">
            Case Weight:
            <input
              onChange={(e) => setCaseWeight(e.target.value)}
              className=" my-2  rouded w-full"
              type="number"
              step="any"
              placeholder="Case Weight"
            />
          </label>

          <label className="border-r-2 border-b-2 font-bold">
            Cost of Goods:
            <input
              onChange={(e) => setCogs(e.target.value)}
              className=" my-2  rouded w-full"
              type="number"
              step="any"
              placeholder="Cost of Goods"
            />
          </label>

          <label className="border-r-2 border-b-2 font-bold">
            Item Name:
            <input
              onChange={(e) => setItemName(e.target.value)}
              className=" my-2  rouded w-full"
              type="text"
              placeholder="Item Name"
            />
          </label>

          <label className="border-r-2 border-b-2 font-bold">
            Lot Number:
            <input
              onChange={(e) => setLotNumber(e.target.value)}
              className=" my-2  rouded w-full"
              type="text"
              placeholder="Lot Number"
            />
          </label>

          <label className="border-r-2 border-b-2 font-bold">
            PO Number:
            <input
              onChange={(e) => setPoNumber(e.target.value)}
              className=" my-2  rouded w-full"
              type="text"
              placeholder="PO Number"
            />
          </label>

          <label className="border-r-2 border-b-2 font-bold">
            Received:
            <input
              onChange={(e) => setReceived(e.target.value)}
              className=" my-2  rouded w-full"
              type="Date"
              placeholder="Date Received"
            />
          </label>

          <label className="border-r-2 border-b-2 font-bold">
            Sales Price:
            <input
              onChange={(e) => setSalesPrice(e.target.value)}
              className=" my-2  rouded w-full"
              type="number"
              step="any"
              placeholder="Sales Price"
            />
          </label>

          <label className="border-r-2 border-b-2 font-bold">
            Size:
            <input
              onChange={(e) => setSize(e.target.value)}
              className=" my-2  rouded w-full"
              type="text"
              placeholder="Size"
            />
          </label>

          <button
            onClick={() =>
              setFormRows(formRows.filter((fr) => fr.id !== row.id))
            }
          >
            <FaTimesCircle className="cursor-pointer" />
          </button>
        </>
      ))}

      <button type="submit">
        <FaCheckCircle className="cursor-pointer" />
      </button>
      <button onClick={addFormRow}>
        <FaPlusCircle className="cursor-pointer" />
      </button>
    </form>
  );
};

export default AddItemForm;
