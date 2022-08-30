import React from "react";

const ReleaseFormRows = ({ item, i }) => {
  return (
    <div
      className={`flex ${
        i % 2 === 0 ? "bg-[#dbe5f1]" : "bg-white"
      } text-center`}
    >
      <div className="w-[20%] border-r border-black">{item?.lotNumber}</div>
      <div className="w-[12.5%] border-r border-black">{item?.caseCount}</div>
      <div className="w-[50%] border-r border-black">{`${item?.itemName} - ${item?.size} - ${item?.brand} - ${item?.caseWeight}`}</div>
      <div className="w-[12.5%]">{item?.caseCount * item.caseWeight}</div>
    </div>
  );
};

export default ReleaseFormRows;
