import React from "react";
import bgImage from "../images/pexels-tiger-lily-4483610.jpg";

const Login = () => {
  const login = () => {};

  return (
    <div className="w-full h-screen">
      <img
        className="absolute w-full h-full object-cover"
        src={bgImage}
        alt="/"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
    </div>
  );
};

export default Login;
