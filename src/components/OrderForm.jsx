import React from "react";
import AquaLogo from "../images/small-aqua-logo.PNG";

const OrderForm = () => {
  const handleSubmit = () => {
    console.log("submit order");
  };

  return (
    <form
      className="w-full border border-black bg-white"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full">
        <img
          src={AquaLogo}
          alt="Logo"
          className="w-1/2 bg-white  border-b border-r border-black mr-2"
        />

        <div className="w-1/2 bg-white  text-center border-l border-b border-black">
          <h1 className="border-b border-black">Cold Storage:</h1>
          <p>Seafrigo Chicago</p>
          <p>4464 W 44th St, Chicago, IL 60632</p>
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-1/2 bg-white h-8 text-center border-r border-b border-black mr-2">
          Release To:
        </div>
        <div className="w-1/2 bg-white h-8 text-center border-l border-b border-black">
          Consignee:
        </div>
      </div>

      <div className="flex w-full">
        <div className="w-1/2 bg-[#dbe5f1] h-20 text-center border-b border-r border-black mr-2">
          <textarea
            placeholder="Enter Carrier Name"
            className="bg-[#dbe5f1] text-center w-full h-full"
          ></textarea>
        </div>

        <div className="w-1/2 bg-[#b7e1cd] h-20 text-center border-b border-l border-black">
          <textarea
            placeholder="Enter Consignee Name"
            className="bg-[#b7e1cd] text-center w-full h-full"
          ></textarea>
        </div>
      </div>

      <div className="flex w-full mt-2 text-center border-t border-b border-black bg-[#dbe5f1]">
        <div className="border-r border-black">
          <h1>PO Number</h1>
          <input
            type="text"
            placeholder="PO Number"
            className="text-center bg-[#dbe5f1]"
          ></input>
        </div>

        <div className="border-r border-black">
          <h1>Release Date:</h1>
          <input type="date" className="text-center bg-[#dbe5f1]"></input>
        </div>

        <div className="border-r border-black w-36 ml-2">
          <h1 className="w-max">Release on Pallets</h1>
          <select className="bg-[#dbe5f1]">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="border-r border-black w-32">
          <h1># of Pallets</h1>
          <input
            type="number"
            min="0"
            className="text-center bg-[#dbe5f1] w-full"
          ></input>
        </div>

        <div className="ml-2">
          <h1>Rep</h1>
          <p>Team 1</p>
        </div>
      </div>

      <table className={`table-auto bg-white rounded-md mt-4 mr-4 ml-4 `}>
        <thead className="border-b-2">
          <tr>
            <th>Lot Number</th>
            <th>Cases</th>
            <th>Description</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody className="text-center ">
          <tr>
            <td>
              <select>
                <option></option>
              </select>
            </td>
            <td>cases input</td>
            <td>autofill item disc</td>
            <td>autofill weight</td>
          </tr>
          <tr>
            <td>dropdown lot #</td>
            <td>cases input</td>
            <td>autofill item disc</td>
            <td>autofill weight</td>
          </tr>
          <tr>
            <td>dropdown lot #</td>
            <td>cases input</td>
            <td>autofill item disc</td>
            <td>autofill weight</td>
          </tr>
          <tr>
            <td>dropdown lot #</td>
            <td>cases input</td>
            <td>autofill item disc</td>
            <td>autofill weight</td>
          </tr>
          <tr>
            <td>dropdown lot #</td>
            <td>cases input</td>
            <td>autofill item disc</td>
            <td>autofill weight</td>
          </tr>
          <tr>
            <td>dropdown lot #</td>
            <td>cases input</td>
            <td>autofill item disc</td>
            <td>autofill weight</td>
          </tr>
          <tr>
            <td>dropdown lot #</td>
            <td>cases input</td>
            <td>autofill item disc</td>
            <td>autofill weight</td>
          </tr>
          <tr>
            <td>dropdown lot #</td>
            <td>cases input</td>
            <td>autofill item disc</td>
            <td>autofill weight</td>
          </tr>
          <tr>
            <td>dropdown lot #</td>
            <td>cases input</td>
            <td>autofill item disc</td>
            <td>autofill weight</td>
          </tr>
          <tr>
            <td>TOTAL</td>
            <td>ADD CASES</td>
            <td>BLANK</td>
            <td>TOTAL WEIGHT</td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default OrderForm;
