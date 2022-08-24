import React, { useState } from "react";

// options / item description / item weight
const OrderFormRow = ({ inventory }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [caseAmount, setCaseAmount] = useState(0);

  const handleLotChange = (selectedLot) => {
    // console.log(selectedLot);
    const inventoryItem = inventory.find(({ lotNumber }) => {
      return lotNumber === selectedLot;
    });
    // console.log(inventoryItem);
    setSelectedItem(inventoryItem);
  };

  return (
    <div className="flex w-full text-center bg-[#dbe5f1] border-b border-black h-10">
      <div className="w-[20%] border-r  border-black">
        <select
          className="bg-[#dbe5f1]"
          onChange={(e) => handleLotChange(e.target.value)}
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
        placeholder="0"
        className="text-center w-[12.5%] border-r border-black bg-[#dbe5f1]"
        onChange={(e) => setCaseAmount(e.target.valueAsNumber)}
      ></input>

      <div className="w-[50%] border-r border-black">
        {/* itemName + size + brand + weight */}
        {selectedItem === null
          ? ""
          : `${selectedItem?.itemName} - ${selectedItem?.size} - ${selectedItem?.brand} - ${selectedItem?.caseWeight}`}
      </div>

      <div className="w-[12.5%]">
        {/* Case x LB */}
        {selectedItem === null ? 0 : caseAmount * +selectedItem.caseWeight}
      </div>
    </div>
  );
};

export default OrderFormRow;
