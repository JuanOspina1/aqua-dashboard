import React from "react";
import { forwardRef } from "react";
import AquaLogo from "../images/small-aqua-logo.PNG";
import ReleaseFormRows from "./ReleaseFormRows";

const ReleaseForm = ({ whseInfo, inventory, formData, formRows }, ref) => {
  // Creating the full items with the release case counts for the rows

  // const releaseItems = formRows.map((item) => {
  //   const matchingItem = inventory.find(
  //     (input) => input.lotNumber === item.lotNumber
  //   );
  //   if (matchingItem) {
  //     // The case count should be the amount being released
  //     //  item.caseCount = matchingItem.caseCount;
  //     return { ...matchingItem, caseCount: item.caseCount };
  //   } else {
  //     return;
  //   }
  // });

  const releaseItems = formRows.map((item) => {
    const matchingItem = inventory.find(
      (input) => input.lotNumber === item.lotNumber
    );
    return { ...matchingItem, caseCount: item.caseCount };
  });

  return (
    <div ref={ref} className="w-full  bg-white p-4">
      <div className="flex w-full">
        <img
          src={AquaLogo}
          alt="Logo"
          className="w-1/2 bg-white  border  border-black mr-2"
        />

        <div className="w-1/2 bg-white  text-center border border-black">
          <h1 className="border-b border-black">Cold Storage:</h1>
          <p>{whseInfo.name}</p>
          <p>{whseInfo.address}</p>
          <p>{whseInfo.phone}</p>
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-1/2 bg-white h-8 text-center border border-black mr-2">
          Release To:
        </div>
        <div className="w-1/2 bg-white h-8 text-center border border-black">
          Consignee:
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-1/2 bg-[#dbe5f1] h-20 text-center border border-black mr-2">
          <div>{formData.releaseTo}</div>
        </div>

        <div className="w-1/2 bg-[#b7e1cd] h-20 text-center border border-black">
          <div>{formData.consignee}</div>
        </div>
      </div>

      {/* ORDER INFORMATION  */}
      <div className="flex w-full mt-2 text-center border border-black bg-[#dbe5f1]">
        <div className="border border-black w-[20%]">
          <h1>PO Number</h1>
          <div className="text-center bg-[#dbe5f1]">{formData.PO}</div>
        </div>

        <div className="border border-black w-[20%]">
          <h1>Release Date:</h1>
          <div className="text-center bg-[#dbe5f1]">{formData.releaseDate}</div>
        </div>

        <div className="border border-black w-[20%]">
          <h1>Release on Pallets</h1>
          <div className="bg-[#dbe5f1]">{formData.releaseOnPallets}</div>
        </div>

        <div className="border border-black w-[20%]">
          <h1># of Pallets</h1>
          <div className="text-center bg-[#dbe5f1]">
            {formData.numberOfPallets}
          </div>
        </div>

        <div className="border border-black w-[20%]">
          <h1>Rep</h1>
          <p>{formData.rep}</p>
        </div>
      </div>

      {/*  ITEM FORM LABELS */}
      <div className="flex w-full text-center bg-white border-b border-black">
        <div className="w-[20%] border-r  border-black">Lot Number</div>

        <div className="w-[12.5%] border-r border-black">Cases</div>

        <div className="w-[50%] border-r border-black">Description</div>

        <div className="w-[12.5%]">Net Weight</div>
      </div>
      <div>
        {releaseItems.map((item, i) => {
          return <ReleaseFormRows key={i} item={item} i={i} />;
        })}
      </div>
      <div className="text-center border-t border-black fixed bottom-0 inset-x-0 p-2">
        Aquanita Foods - 2150 Coral Way, Suite 7A, Miami FL 33145 -
        Delivery@auqan
      </div>
    </div>
  );
};

export default forwardRef(ReleaseForm);
