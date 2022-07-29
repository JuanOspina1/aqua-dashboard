import React from "react";
import {
  FaHome,
  FaWarehouse,
  FaClipboardList,
  FaTools,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

// Need to fix css so only the link only works on the button click instead of the entire div

const Sidebar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  // console.log(user.email)

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 h-screen w-40 m-0 pt-4 flex flex-col bg-gray-600">
      <Link to="/home">
        <div className="sidebar-icon">
          <FaHome />
          <span className="p-2"> Home</span>
        </div>
      </Link>

      {/* Order tab to be implemented in the future, using single item withdraw currently */}
      {/* <Link to="/orders">
        <div className="sidebar-icon">
          <FaClipboardList />
          <span className="p-2">Orders</span>
        </div>
      </Link> */}

      <Link to="/warehouses">
        <div className="sidebar-icon">
          <FaWarehouse />
          <span className="p-2">Warehouse</span>
        </div>
      </Link>

      <Link to="/management">
        <button className="sidebar-icon">
          <FaTools />
          <span className="p-2">Management</span>
        </button>
      </Link>

      <button className="sidebar-icon" onClick={handleLogout}>
        <FaSignOutAlt /> <span className="p-2">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
