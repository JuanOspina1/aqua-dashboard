import React from "react";
import { FaHome, FaWarehouse, FaClipboardList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed top-0 h-screen w-40 m-0 pt-4 flex flex-col bg-gray-600">
      <Link to="/">
        <div className="sidebar-icon">
          <FaHome />
          <span className="p-2">Home</span>
        </div>
      </Link>

      <Link to="/orders">
        <div className="sidebar-icon">
          <FaClipboardList />
          <span className="p-2">Orders</span>
        </div>
      </Link>

      <Link to="/warehouses">
        <div className="sidebar-icon">
          <FaWarehouse />
          <span className="p-2">Warehouse</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
