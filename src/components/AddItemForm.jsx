import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";

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
  };

  const createItem = (e) => {
    e.preventDefault();
    const newItem = {
      brand: brand,
      caseCount: caseCount,
      caseWeight: caseWeight,
      cogs: cogs,
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
    <form onSubmit={createItem} className="w-full flex flex-col py-4">
      <label>
        {" "}
        Brand:
        <input
          onChange={(e) => setBrand(e.target.value)}
          className="p-3 my-2 bg-gray-700 rouded"
          type="text"
          placeholder="Brand"
        />
      </label>

      <label>
        Case Count:
        <input
          onChange={(e) => setCaseCount(e.target.value)}
          className="p-3 my-2 bg-gray-700 rouded"
          type="number"
          step="any"
          placeholder="Case Count"
        />
      </label>

      <label>
        Case Weight:
        <input
          onChange={(e) => setCaseWeight(e.target.value)}
          className="p-3 my-2 bg-gray-700 rouded"
          type="number"
          step="any"
          placeholder="Case Weight"
        />
      </label>

      <label>
        Cost of Goods:
        <input
          onChange={(e) => setCogs(e.target.value)}
          className="p-3 my-2 bg-gray-700 rouded"
          type="number"
          step="any"
          placeholder="Cost of Goods"
        />
      </label>

      <label>
        Item Name:
        <input
          onChange={(e) => setItemName(e.target.value)}
          className="p-3 my-2 bg-gray-700 rouded"
          type="text"
          placeholder="Item Name"
        />
      </label>

      <label>
        Lot Number:
        <input
          onChange={(e) => setLotNumber(e.target.value)}
          className="p-3 my-2 bg-gray-700 rouded"
          type="text"
          placeholder="Lot Number"
        />
      </label>

      <label>
        PO Number:
        <input
          onChange={(e) => setPoNumber(e.target.value)}
          className="p-3 my-2 bg-gray-700 rouded"
          type="text"
          placeholder="PO Number"
        />
      </label>

      <label>
        Received:
        <input
          onChange={(e) => setReceived(e.target.value)}
          className="p-3 my-2 bg-gray-700 rouded"
          type="Date"
          placeholder="Date Received"
        />
      </label>

      <label>
        Sales Price:
        <input
          onChange={(e) => setSalesPrice(e.target.value)}
          className="p-3 my-2 bg-gray-700 rouded"
          type="number"
          step="any"
          placeholder="Sales Price"
        />
      </label>

      <label>
        Size:
        <input
          onChange={(e) => setSize(e.target.value)}
          className="p-3 my-2 bg-gray-700 rouded"
          type="text"
          placeholder="Size"
        />
      </label>
      <button className="bg-red-600 py-3 my-6 rounded font-bold">
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;
