import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import VendorSignup from "./components/VendorSignup";
import VendorLogin from "./components/VendorLogin";
import VendorDashboard from "./components/VendorDashboard";
import VendorHome from "./components/VendorHome";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ManageProducts from "./components/manageproducts";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Vendor Signup */}
      <Route path="/vendor/signup" element={<VendorSignup />} />

      <Route path="/vendor/login" element={<VendorLogin />} />

      {/* Vendor Dashboard (LAYOUT ROUTE) */}
     <Route path="/vendor" element={<VendorDashboard />}>
        <Route index element={<VendorHome />} />
        <Route path="dashboard" element={<VendorHome />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="manage-products" element={<ManageProducts />} />
      </Route>
    </Routes>
  );
}

export default App;
