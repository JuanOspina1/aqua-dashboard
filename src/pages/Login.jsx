import React, { useState } from "react";
import bgImage from "../images/pexels-tiger-lily-4483610.jpg";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-screen">
      <img
        className="absolute w-full h-full object-cover"
        src={bgImage}
        alt="/"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full px-4 py-52 z-50">
        <div className="max-w-[450px] h-[450px] mx-auto bg-black/60 text-black">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold text-[#06aedb]">Sign In</h1>
            {error ? <p className="p-3 bg-red-400 my-2">{error}</p> : null}
            <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 my-2 bg-slate-200  rouded"
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 my-2 bg-slate-200  rouded"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              {/* <button className="bg-red-600 py-3 my-6 rounded font-bold"> */}
              <button
                className="relative flex items-center justify-center 
                py-3 my-6 shadow-lg
                bg-slate-200 text-[#06aedb]
            hover:bg-[#06aedb] hover:text-white
            rounded-3xl hover:rounded-xl
            transition-all duration-300 ease-linear
            cursor-pointer col-span-2"
              >
                Sign In
              </button>
              <div className="flex justify-between items-center text-sm text-gray-600"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
