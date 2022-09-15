import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, authState } = UserAuth();

  //
  if (authState) {
    if (!user) {
      console.log("no user");
      return <Navigate to="/" />;
    } else {
      console.log("There is a user");
      return children;
    }
  }
};

export default ProtectedRoute;
