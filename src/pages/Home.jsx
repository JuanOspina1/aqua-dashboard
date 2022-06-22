import React from "react";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <div className="flex-wrap w-full">
        <Sidebar />
        <div className="h-auto w-full">
          <h1 className="text-3xl font-bold p-4 text-center">Home</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
