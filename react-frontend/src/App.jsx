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
import Logout from "./components/Logout";
import Accountsetting from "./components/Accountsetting";


function App() {
  return (
    <Routes>
  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  <Route path="/vendor/signup" element={<VendorSignup />} />
  <Route path="/vendor/login" element={<VendorLogin />} />

  {/* Logout must be OUTSIDE vendor layout */}
  <Route path="/logout" element={<Logout />} />

  {/* Vendor Dashboard Layout */}
  <Route path="/vendor" element={<VendorDashboard />}>
    <Route index element={<VendorHome />} />
    <Route path="dashboard" element={<VendorHome />} />
    <Route path="add-product" element={<AddProduct />} />
    <Route path="manage-products" element={<ManageProducts />} />
    <Route path="account-settings" element={<Accountsetting />} />
  </Route>
</Routes>

  );
}

export default App;
