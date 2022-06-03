import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";

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
  // CREATE RECEIVED DATE

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

  /////////////////////////
  // Change number type to text

  // onChange is making this component mount every time
  return (
    /////////////////////////////////
    // ATTEMPT TO CREATE ADDITIONAL ROWS
    // Consolidate Styling into the CSS sheet
    // Need to create input validation
    // Need to clear input fields - I am already clearing the state upon input, not sure if that is necessary if I am going to hide the form upon submission
    <form
      onSubmit={createItem}
      className="grid grid-cols-10 gap-4 ml-4 mt-4 w-full"
    >
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
      {/* <button className="bg-red-600 py-3 my-6 rounded font-bold">
        Add Item
      </button> */}
      <button type="submit">
        <FaPlusCircle className="cursor-pointer" />
      </button>
    </form>
  );
};

export default AddItemForm;
