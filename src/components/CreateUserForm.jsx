import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";

// I would like to implement a disappearing success message when a new user is created.

const CreateUserForm = () => {
  const [inputs, setInputs] = useState({});

  const { user, signUp } = UserAuth();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(
        inputs.email,
        inputs.password,
        inputs.firstName,
        inputs.lastName,
        inputs.officeAddress,
        inputs.officePhone
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white mt-4 mr-4 rounded-md shadow-lg">
      <h1 className="text-center py-2 font-bold text-lg ">Create New User</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 px-4 justify-items-center"
      >
        <label className="create-user-form-label">
          Email Address:
          <input
            className="block rounded-md"
            type="text"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-user-form-label">
          Password:
          <input
            className="block rounded-md"
            type="text"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-user-form-label">
          First Name:
          <input
            className="block rounded-md"
            type="text"
            name="firstName"
            value={inputs.firstName || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-user-form-label">
          Last Name:
          <input
            className="block rounded-md"
            type="text"
            name="lastName"
            value={inputs.lastName || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-user-form-label">
          Office Address:
          <input
            className="block rounded-md"
            type="text"
            name="officeAddress"
            value={inputs.officeAddress || ""}
            onChange={handleChange}
          />
        </label>
        <label className="create-user-form-label">
          Office Phone Number:
          <input
            className="block rounded-md"
            type="text"
            name="officePhone"
            value={inputs.officePhone || ""}
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
          Submit New User
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;
