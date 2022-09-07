import React, { useState } from "react";
import toast from "react-hot-toast";
import FirebaseServices from "../services/FirebaseServices";

const CreateWhseForm = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Submit new warehouse to the DB

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    // Create Warehouse
    toast.promise(FirebaseServices.createWarehouse(inputs), {
      loading: "Loading",
      success: "Warehouse Created!",
      error: "Issue Creating Warehouse",
    });

    // Empty the form fields
    setInputs({});
  };

  return (
    <div className="bg-slate-200  mt-4  mr-4 rounded-md shadow-lg">
      <h1 className="text-center py-2 font-bold text-lg ">
        Create New Warehouse
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 px-4 justify-items-center"
      >
        <label className="create-user-form-label">
          Warehouse Name:
          <input
            className="block"
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-user-form-label">
          Warehouse Email:
          <input
            className="block"
            type="text"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-user-form-label">
          Warehouse Address:
          <input
            className="block"
            type="text"
            name="address"
            value={inputs.address || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-user-form-label">
          Warehouse Phone:
          <input
            className="block"
            type="text"
            name="phone"
            value={inputs.phone || ""}
            onChange={handleChange}
          />
        </label>

        <button
          className="relative flex items-center justify-center 
            h-12 w-36 mt-2 mb-2 mx-auto shadow-lg
            bg-gray-800 text-[#06aedb]
            hover:bg-[#06aedb] hover:text-white
            rounded-3xl hover:rounded-xl
            transition-all duration-300 ease-linear
            cursor-pointer col-span-2"
        >
          Submit New Warehouse
        </button>
      </form>
    </div>
  );
};

export default CreateWhseForm;
