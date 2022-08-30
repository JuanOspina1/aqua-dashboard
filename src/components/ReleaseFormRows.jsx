import React from "react";

const TemplateRows = ({ item, i }) => {
  return (
    <div className={`flex ${i % 2 === 0 ? "bg-[#dbe5f1]" : "bg-white"}`}>
      <div className="w-[20%]">{item?.lotNumber}</div>
      <div className="w-[12.5%]">{item?.caseCount}</div>
      <div className="w-[50%]">{`${item?.itemName} - ${item?.size} - ${item?.brand} - ${item?.caseWeight}`}</div>
      <div className="w-[12.5%]">{item?.caseCount * item.caseWeight}</div>
    </div>
  );
};

export default TemplateRows;
