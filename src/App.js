import { Route, Routes } from "react-router-dom";
import WarehouseMgnt from "./pages/WarehouseMgnt";
import Home from "./pages/Home";
import Warehouses from "./pages/Warehouses";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      {/* <div className="flex "> */}
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/management" element={<WarehouseMgnt />} />
        </Routes>
      </AuthContextProvider>
      {/* </div> */}
    </>
  );
}

export default App;
