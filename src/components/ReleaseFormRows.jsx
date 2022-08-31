import React from "react";

const ReleaseFormRows = ({ item, i }) => {
  // console.log(item);

  // initial item prop is an empty case count - I am only trying to show the rest of the item once a lot number is present

  return (
    <div
      className={`flex ${
        i % 2 === 0 ? "bg-[#dbe5f1]" : "bg-white"
      } text-center`}
    >
      <div className="w-[20%] border-r border-black">{item?.lotNumber}</div>
      <div className="w-[12.5%] border-r border-black">{item?.caseCount}</div>
      <div className="w-[50%] border-r border-black">
        {item.lotNumber
          ? `${item?.itemName} - ${item?.size} - ${item?.brand} - ${item?.caseWeight}`
          : ""}
      </div>
      <div className="w-[12.5%]">
        {item.lotNumber ? item?.caseCount * item?.caseWeight : ""}
      </div>
    </div>
  );
};

export default ReleaseFormRows;
