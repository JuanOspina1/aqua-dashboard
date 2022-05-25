import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AddWarehouse from "./pages/AddWarehouse";
import Home from "./pages/Home";
import Warehouses from "./pages/Warehouses";
import Orders from "./pages/Orders";

function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/new-warehouse" element={<AddWarehouse />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
