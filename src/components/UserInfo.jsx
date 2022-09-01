import React from "react";

const UserInfo = ({ currentUserInfo }) => {
  // console.log(currentUserInfo);
  const { userInfo } = currentUserInfo;

  // email / firstName / lastName / officeAddress / officePhone

  return (
    <div className="grid grid-cols-2 ml-4 bg-white  rounded-md shadow-lg w-[600px]">
      <div className="whse-info">
        <h1 className="font-bold">Employee Name</h1>
        <p>{userInfo ? userInfo.firstName + " " + userInfo.lastName : ""}</p>
      </div>

      <div className="whse-info">
        <h1 className="font-bold">Employee Email</h1>
        <p>{userInfo?.email}</p>
      </div>

      <div className="whse-info">
        <h1 className="font-bold">Office Address</h1>
        <p>{userInfo?.officeAddress}</p>
      </div>

      <div className="whse-info">
        <h1 className="font-bold">Office Phone Number</h1>
        <p>{userInfo?.officePhone}</p>
      </div>
    </div>
  );
};

export default UserInfo;
