import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

// I would like to implement a dissapearing success message when a new user is created.

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
    <form onSubmit={handleSubmit} className="bg-slate-400 mt-4">
      <label>
        Email Address:
        <input
          type="text"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          name="password"
          value={inputs.password || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={inputs.firstName || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={inputs.lastName || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Office Address:
        <input
          type="text"
          name="officeAddress"
          value={inputs.officeAddress || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Office Phone Number:
        <input
          type="text"
          name="officePhone"
          value={inputs.officePhone || ""}
          onChange={handleChange}
        />
      </label>
      <button>Submit New User</button>
    </form>
  );
};

export default CreateUserForm;
