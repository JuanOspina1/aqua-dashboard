import React, { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";

// options / item description / item weight
const OrderFormRow = ({
  inventory,
  onFormRowInputChange,
  index,
  formRows,
  setFormRows,
}) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [caseAmount, setCaseAmount] = useState(0);

  const handleLotChange = (selectedLot) => {
    console.log(selectedLot);

    if (selectedLot === "") {
      setSelectedItem("");
    } else {
      const inventoryItem = inventory.find(({ lotNumber }) => {
        return lotNumber === selectedLot;
      });
      // console.log(inventoryItem);
      setSelectedItem(inventoryItem);
    }
  };

  const removeFormRow = (index) => () => {
    // console.log(index);
    setFormRows(formRows.filter((fr, i) => i !== index));
  };

  return (
    <div className="flex w-full text-center bg-[#dbe5f1] border-b border-black h-10">
      <div className="w-[20%] border-r  border-black">
        <select
          className="bg-[#dbe5f1]"
          onChange={(e) => {
            onFormRowInputChange("lotNumber", e.target.value);
            handleLotChange(e.target.value);
          }}
        >
          <option value=""></option>
          {inventory.map((item) => {
            return (
              <option key={item.lotNumber} value={item.lotNumber}>
                {item.lotNumber}
              </option>
            );
          })}
        </select>
      </div>

      <input
        type="number"
        min="0"
        max={selectedItem === "" ? "100000" : `${selectedItem?.caseCount}`}
        placeholder="0"
        className="text-center w-[12.5%] border-r border-black bg-[#dbe5f1]"
        onChange={(e) => {
          onFormRowInputChange("caseCount", e.target.value);
          setCaseAmount(e.target.valueAsNumber);
        }}
      ></input>

      <div className="w-[50%] border-r border-black">
        {/* itemName + size + brand + weight */}
        {selectedItem === ""
          ? ""
          : `${selectedItem?.itemName} - ${selectedItem?.size} - ${selectedItem?.brand} - ${selectedItem?.caseWeight}`}
      </div>

      <div className="w-[12.5%]">
        {/* Case x LB */}
        {selectedItem === "" ? 0 : caseAmount * +selectedItem?.caseWeight}
      </div>
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

export default OrderFormRow;
