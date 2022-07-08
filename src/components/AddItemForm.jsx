import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { FaCheckCircle, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

///////////////////////////////////
// WHEN YOU ADD A NEW LINE, IT DELETES THE INFORMATION ON THE PREVIOUS LINES - MAY NEED TO FIND A WAY TO HOLD THE STATE FOR EACH LINE DYNAMICALLY.

const AddItemForm = ({ currWhse, handleAddItemClick }) => {
  console.log("component mounted");
  // Default rows of 1
  const [formRows, setFormRows] = useState([{ id: 1 }]);

  const [inputs, setInputs] = useState([]);

  // Trying to put each into an array and then form an object based on the index. Effect: This just adds a new item to the array on each click
  const [inputs1, setInputs1] = useState({
    brand: [],
    caseCount: [],
    caseWeight: [],
    cogs: [],
    itemName: [],
    lotNumber: [],
    poNumber: [],
    received: [],
    salesPrice: [],
    size: [],
  });

  // ORIGINAL WORKING EXAMPLE
  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setInputs((values) => ({ ...values, [name]: value }));
  // };

  // REFACTORING TRIAL
  const handleChange = (e) => {
    e.preventDefault();
    formRows.forEach((id, i) => {
      const name = e.target.name;
      const value = e.target.value;
      setInputs1((values) => ({
        ...values,
        [name]: [...values[name]].splice(i, 0, value),
      }));
    });
  };

  // Everytime i type, it adds a new number to the array
  const handleChange1 = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const index = e.target.dataset.index;
    // setInputs1((values) => ({ ...values, [name]: [...values[name], value] }));
    setInputs1((values) => ({
      ...values,
      [name]: [...values[name], value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs1);
  };

  // Using a normal variable instead of state for adding multiple items
  const newItemsArr = [];

  const addFormRow = (e) => {
    e.preventDefault();
    setFormRows([...formRows, { id: formRows.length + 1 }]);
  };
  // State that controls the current warehouse

  // Working example to add items
  const addItemArrToWhse = async () => {
    const whseRef = doc(db, "warehouses", currWhse);
    await updateDoc(whseRef, {
      Items: arrayUnion(...newItemsArr),
    });
  };

  // Working example to add items
  const createAllItems = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.brand);
    console.log(e.target.brand.value);

    if (formRows.length > 1) {
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
    } else {
      const newItem = {
        brand: e.target.brand.value,
        caseCount: e.target.caseCount.value,
        caseWeight: e.target.caseWeight.value,
        cogs: e.target.cogs.value,
        itemName: e.target.itemName.value,
        lotNumber: e.target.lotNumber.value,
        poNumber: e.target.poNumber.value,
        // received: received,
        salesPrice: e.target.salesPrice.value,
        size: e.target.size.value,
      };
      newItemsArr.push(newItem);
    }
    console.log(newItemsArr);
    addItemArrToWhse(newItemsArr);
    handleAddItemClick();
  };

  // STACK OVERFLOW SOLUTION - TRY KEEPING A CONSTANT KEY TO KEEP FOCUS ON INPUT FIELD - maybe index + a number

  return (
    /////////////////////////////////
    // Consolidate Styling into the CSS sheet
    // Need to create input validation ( MOST IMPORTANT: LOT NUMBERS MUST BE UNIQUE - BASIS OF DELETION)
    // Onsubmit use createAllItems

    <form onSubmit={handleSubmit} key={uuidv4()} className="ml-4 mt-4 w-full">
      {formRows.map((row, i) => {
        return (
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
              onClick={() =>
                setFormRows(formRows.filter((fr) => fr.id !== row.id))
              }
            >
              <FaTimesCircle
                className="cursor-pointer fill-red-600"
                size={40}
              />
            </button>
          </div>
        );
      })}

      <button type="submit">
        {/* <button onClick={consoleBrandsArr}> */}
        <FaCheckCircle className="cursor-pointer" size={40} />
      </button>
      <button onClick={addFormRow}>
        <FaPlusCircle className="cursor-pointer ml-4" size={40} />
      </button>
    </form>
  );

  // Working example
  // return (
  //   /////////////////////////////////
  //   // Consolidate Styling into the CSS sheet
  //   // Need to create input validation ( MOST IMPORTANT: LOT NUMBERS MUST BE UNIQUE - BASIS OF DELETION)

  //   <form onSubmit={createAllItems} key={uuidv4()} className="ml-4 mt-4 w-full">
  //     {formRows.map((row) => {
  //       return (
  //         <div key={uuidv4()} className="grid grid-cols-11 gap-4">
  //           <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
  //             Brand:
  //             <input
  //               key={uuidv4()}
  //               name="brand"
  //               className=" my-2 w-full rouded "
  //               type="text"
  //               placeholder="Brand"
  //             />
  //           </label>

  //           <label key={uuidv4()} className="border-r-2  border-b-2 font-bold">
  //             Case Count:
  //             <input
  //               key={uuidv4()}
  //               name="caseCount"
  //               className=" my-2  rouded w-full"
  //               type="number"
  //               step="any"
  //               placeholder="Case Count"
  //             />
  //           </label>

  //           <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
  //             Case Weight:
  //             <input
  //               key={uuidv4()}
  //               name="caseWeight"
  //               className=" my-2  rouded w-full"
  //               type="number"
  //               step="any"
  //               placeholder="Case Weight"
  //             />
  //           </label>

  //           <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
  //             Cost of Goods:
  //             <input
  //               key={uuidv4()}
  //               name="cogs"
  //               className=" my-2  rouded w-full"
  //               type="number"
  //               step="any"
  //               placeholder="Cost of Goods"
  //             />
  //           </label>

  //           <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
  //             Item Name:
  //             <input
  //               key={uuidv4()}
  //               name="itemName"
  //               className=" my-2  rouded w-full"
  //               type="text"
  //               placeholder="Item Name"
  //             />
  //           </label>

  //           <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
  //             Lot Number:
  //             <input
  //               key={uuidv4()}
  //               name="lotNumber"
  //               className=" my-2  rouded w-full"
  //               type="text"
  //               placeholder="Lot Number"
  //             />
  //           </label>

  //           <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
  //             PO Number:
  //             <input
  //               key={uuidv4()}
  //               name="poNumber"
  //               className=" my-2  rouded w-full"
  //               type="text"
  //               placeholder="PO Number"
  //             />
  //           </label>

  //           <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
  //             Received:
  //             <input
  //               key={uuidv4()}
  //               name="received"
  //               className=" my-2  rouded w-full"
  //               type="Date"
  //               placeholder="Date Received"
  //             />
  //           </label>

  //           <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
  //             Sales Price:
  //             <input
  //               key={uuidv4()}
  //               name="salesPrice"
  //               className=" my-2  rouded w-full"
  //               type="number"
  //               step="any"
  //               placeholder="Sales Price"
  //             />
  //           </label>

  //           <label key={uuidv4()} className="border-r-2 border-b-2 font-bold">
  //             Size:
  //             <input
  //               key={uuidv4()}
  //               name="size"
  //               className=" my-2  rouded w-full"
  //               type="text"
  //               placeholder="Size"
  //             />
  //           </label>

  //           <button
  //             key={uuidv4()}
  //             type="button"
  //             onClick={() =>
  //               setFormRows(formRows.filter((fr) => fr.id !== row.id))
  //             }
  //           >
  //             <FaTimesCircle className="cursor-pointer" />
  //           </button>
  //         </div>
  //       );
  //     })}

  //     <button type="submit">
  //       {/* <button onClick={consoleBrandsArr}> */}
  //       <FaCheckCircle className="cursor-pointer" />
  //     </button>
  //     <button onClick={addFormRow}>
  //       <FaPlusCircle className="cursor-pointer" />
  //     </button>
  //   </form>
  // );
};

export default AddItemForm;
