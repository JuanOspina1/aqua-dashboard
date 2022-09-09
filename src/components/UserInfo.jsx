import React from "react";

const UserInfo = ({ currentUserInfo }) => {
  console.log(currentUserInfo);

  return (
    <div className="grid grid-cols-2 ml-4 bg-white  rounded-md shadow-lg w-full">
      <div className="whse-info">
        <h1 className="font-bold">Employee Name</h1>
        <p>
          {currentUserInfo
            ? currentUserInfo.userInfo?.firstName +
              " " +
              currentUserInfo.userInfo?.lastName
            : ""}
        </p>
      </div>

      <div className="whse-info">
        <h1 className="font-bold">Employee Email</h1>
        <p>{currentUserInfo.userInfo?.email}</p>
      </div>

      <div className="whse-info">
        <h1 className="font-bold">Office Address</h1>
        <p>{currentUserInfo.userInfo?.officeAddress}</p>
      </div>

      <div className="whse-info">
        <h1 className="font-bold">Office Phone Number</h1>
        <p>{currentUserInfo.userInfo?.officePhone}</p>
      </div>
    </div>
  );
};

export default UserInfo;
