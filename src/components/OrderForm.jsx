import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import FirebaseServices from "../services/FirebaseServices";
import OrderFormRow from "./OrderFormRow";
import ReleaseForm from "./ReleaseForm";
import toast from "react-hot-toast";

// INPUTS: CURRENT WAREHOUSE / RELEASE TO / CONSIGNEE / PO / RELEASE DATE / RELEASE ON PALLETS? / # OF PALLETS / REP / ARRAY OF LOT #s WITH CASE COUNTS

const OrderForm = ({ whseID, inventory, whseInfo }) => {
  const [formRows, setFormRows] = useState([
    {
      caseCount: "",
      lotNumber: "",
    },
  ]);

  const [formData, setFormData] = useState({
    releaseTo: "",
    consignee: "",
    PO: "",
    releaseDate: "",
    releaseOnPallets: "Yes",
    numberOfPallets: "",
    rep: "",
  });

  ////////////////////////////////
  // PRINTING SECTION

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  ////////////////////////////////
  // ON CHANGE SECTION

  const onFormRowInputChange = (rowIndex) => (name, value) => {
    // Create copy of the state
    // console.log(rowIndex, name, value);
    let newInput = [...formRows];
    // Find the index of the selected input and then find the matching name
    newInput[rowIndex][name] = value;
    setFormRows(newInput);
  };

  const onFormChange = (name, value) => {
    ///////////////////////
    let newInput = formData;
    newInput[name] = value;
    setFormData(newInput);
  };

  const addFormRow = (e) => {
    e.preventDefault();

    setFormRows([
      ...formRows,
      {
        caseCount: "",
        lotNumber: 0,
      },
    ]);
  };

  ////////////////////////////////
  // SUBMITTING ORDER

  const submitOrder = (e) => {
    e.preventDefault();

    handlePrint();

    console.log(formRows);
    console.log(formData);

    const newOrder = formData;
    newOrder.items = [...formRows];
    console.log(newOrder);

    FirebaseServices.withdrawOrderQty(whseID, inventory, formRows);
    toast.promise(FirebaseServices.createOrder(newOrder), {
      loading: "Processing Order",
      success: "Order Created!",
      error: "There was an error creating an order.",
    });
  };

  return (
    <>
      <form className="rounded" onSubmit={(e) => submitOrder(e)}>
        <div className="flex space-x-4 bg-white h-max w-1/2 text-center rounded">
          <div className="ml-2">
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
              <h1>Rep:</h1>
              <input
                onChange={(e) => onFormChange("rep", e.target.value)}
                type="text"
                className="bg-[#dbe5f1]"
              ></input>
            </div>

            <div>
              <h1>Release Date:</h1>
              <input
                onChange={(e) => onFormChange("releaseDate", e.target.value)}
                type="date"
                className="bg-[#dbe5f1]"
              ></input>
            </div>

            <div>
              <h1>Number of Pallets</h1>
              <input
                type="number"
                min="0"
                placeholder="0"
                className="bg-[#dbe5f1]"
                onChange={(e) =>
                  onFormChange("numberOfPallets", e.target.value)
                }
              ></input>
            </div>

            <div>
              <h1>Release on Pallets?</h1>
              <select
                className="bg-[#dbe5f1]"
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
        <div className="flex flex-wrap w-1/2">
          {formRows.map((row, i) => {
            return (
              <OrderFormRow
                key={i}
                index={i}
                value={row}
                inventory={inventory}
                onFormRowInputChange={onFormRowInputChange(i)}
                setFormRows={setFormRows}
                formRows={formRows}
                row={row}
              />
            );
          })}

          <button type="submit">
            <FaCheckCircle className="cursor-pointer" size={40} />
          </button>
          <button onClick={addFormRow}>
            <FaPlusCircle className="cursor-pointer ml-4" size={40} />
          </button>
        </div>

        <div className="hidden">
          <ReleaseForm
            ref={componentRef}
            whseInfo={whseInfo}
            formData={formData}
            formRows={formRows}
            inventory={inventory}
          />
        </div>
      </form>
    </>
  );
};

export default OrderForm;
