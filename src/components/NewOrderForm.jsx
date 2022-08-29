import React, { useState } from "react";

// INPUTS: CURRENT WAREHOUSE / RELEASE TO / CONSIGNEE / PO / RELEASE DATE / RELEASE ON PALLETS? / # OF PALLETS / REP / ARRAY OF LOT #s WITH CASE COUNTS

const NewOrderForm = ({ whseID, warehouseCollection, whseInfo, inventory }) => {
  const [formData, setFormData] = useState({
    releaseTo: "",
    consignee: "",
    PO: "",
    releaseDate: "",
    releaseOnPallets: "",
    numberOfPallets: "",
    rep: "",
  });

  const onFormChange = (name, value) => {
    ///////////////////////
    let newInput = formData;
    newInput[name] = value;
    setFormData(newInput);
  };

  const checkForm = () => {
    console.log(formData);
  };

  return (
    <>
      <form>
        <div className="flex space-x-4 bg-white h-max">
          <div>
            <h1>Release To:</h1>
            <textarea
              onChange={(e) => onFormChange("releaseTo", e.target.value)}
              //   value={formData?.releaseTo}
              placeholder="Enter Carrier Name"
              className="bg-[#dbe5f1] text-center w-full h-5/6"
            ></textarea>
          </div>
          <div>
            <h1>Consignee:</h1>
            <textarea
              onChange={(e) => onFormChange("consignee", e.target.value)}
              //   value={formData?.consignee}
              placeholder="Enter Carrier Name"
              className="bg-[#dbe5f1] text-center w-full h-5/6"
            ></textarea>
          </div>
          <div className="">
            <h1>PO Number</h1>
            <textarea
              onChange={(e) => onFormChange("PO", e.target.value)}
              type="text"
              placeholder="PO Number"
              className="text-center bg-[#dbe5f1] w-full h-5/6"
              //   value={formData?.PO}
            ></textarea>
          </div>

          <div className="flex flex-col space-y-4">
            <div>
              <h1>Release Date:</h1>
              <input
                onChange={(e) => onFormChange("releaseDate", e.target.value)}
                type="date"
                //   value={formData?.releaseDate}
              ></input>
            </div>

            <div>
              <h1>Number of Pallets</h1>
              <input type="number" min="0" placeholder="0"></input>
            </div>

            <div>
              <h1>Release on Pallets?</h1>
              <select
                onChange={(e) =>
                  onFormChange("releaseOnPallets", e.target.value)
                }
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      <button
        className="h-[50px] w-[50px] bg-black"
        onClick={checkForm}
      ></button>
    </>
  );
};

export default NewOrderForm;
