import React, { useState } from "react";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import UserInfo from "../components/UserInfo";
import { UserAuth } from "../context/AuthContext";
import FirebaseServices from "../services/FirebaseServices";

const Home = () => {
  // User gives me the email
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const { user } = UserAuth();

  const getUser = async (userEmail) => {
    const data = await FirebaseServices.getUserInformation(userEmail);
    setCurrentUserInfo(data);
    console.log(currentUserInfo);
  };

  useEffect(() => {
    getUser(user.email);
  }, []);

  return (
    <>
      <div className="flex-wrap w-full">
        <Sidebar />
        <div className="ml-40">
          <div className="h-auto w-full">
            <h1 className="text-3xl font-bold p-4 text-center">Home</h1>
          </div>
          <UserInfo currentUserInfo={currentUserInfo} />
        </div>
      </div>
    </>
  );
};

export default Home;
