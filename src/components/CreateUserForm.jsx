import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const CreateUserForm = () => {
  // Attempt to handle the entire form in one state
  const [inputs, setInputs] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [officePhone, setOfficePhone] = useState("");

  const { user, signUp } = UserAuth();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     console.log(inputs);
  //   };
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

// const CreateUserForm = () => {
//   // Attempt to handle the entire form in one state
//   // const [inputs, setInputs] = useState({})

//   // const handleChange = (e) => {
//   //     const name = e.target.name;
//   //     const value = e.target.value;
//   //     setInputs(values => ({...values, [name]: value}))
//   //   }

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [officeAddress, setOfficeAddress] = useState("");
//   const [officePhone, setOfficePhone] = useState("");

//   const { user, signUp } = UserAuth();
//   //   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signUp(
//         email,
//         password,
//         firstName,
//         lastName,
//         officeAddress,
//         officePhone
//       );
//       //   navigate("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Email Address:
//         <input
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </label>
//       <label>
//         Password:
//         <input
//           type="text"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>
//       <label>
//         First Name:
//         <input
//           type="text"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//       </label>
//       <label>
//         Last Name:
//         <input
//           type="text"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//         />
//       </label>
//       <label>
//         Office Address:
//         <input
//           type="text"
//           value={officeAddress}
//           onChange={(e) => setOfficeAddress(e.target.value)}
//         />
//       </label>
//       <label>
//         Office Phone Number:
//         <input
//           type="text"
//           value={officePhone}
//           onChange={(e) => setOfficePhone(e.target.value)}
//         />
//       </label>
//       <button>Submit New User</button>
//     </form>
//   );
// };

export default CreateUserForm;
