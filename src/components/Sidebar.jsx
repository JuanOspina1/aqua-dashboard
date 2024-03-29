import React from "react";
import { FaHome, FaWarehouse, FaTools, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  // console.log(user.email)

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      // console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = (page) => {
    const goToPage = page.replace(/\s+/g, "").toLowerCase();
    // console.log(goToPage);
    navigate(`/${goToPage}`);
  };

  return (
    <div className="fixed top-0 h-full w-40 m-0 pt-4 flex flex-col bg-gray-800">
      {/* <Link to="/home">
        <div className="sidebar-icon">
          <FaHome />
          <span className="p-2"> Home</span>
        </div>
      </Link> */}

      <div className="text-center font-bold text-xl text-[#06aedb]">
        AQUA DASHBOARD
      </div>
      <div className="border-b-8 border-[#06aedb] mt-4"></div>

      <button
        className="sidebar-icon"
        onClick={(e) => handleNavigate(e.target.textContent)}
      >
        <FaHome /> <span className="p-2">Home</span>
      </button>

      {/* I have moved orders functionality to the warehouse tab */}

      {/* <button
        className="sidebar-icon"
        onClick={(e) => handleNavigate(e.target.textContent)}
      >
        <FaClipboardList /> <span className="p-2">Orders</span>
      </button> */}

      <button
        className="sidebar-icon"
        onClick={(e) => handleNavigate(e.target.textContent)}
      >
        <FaWarehouse /> <span className="p-2">Warehouses</span>
      </button>

      {/* <button
        className="sidebar-icon"
        onClick={(e) => handleNavigate(e.target.textContent)}
      >
        <FaTools /> <span className="p-2">Management</span>
      </button> */}

      <button className="sidebar-icon" onClick={handleLogout}>
        <FaSignOutAlt /> <span className="p-2">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
