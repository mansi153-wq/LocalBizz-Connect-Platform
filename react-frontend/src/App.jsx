import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Explore from "./components/Explore";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import CustomerLayout from "./components/CustomerLayout";
import CustomerDashboard from "./components/CustomerDashboard";
import CustomerOrders from "./components/CustomerOrders";
import About from "./components/About";
import Contact from "./components/Contact";

import VendorSignup from "./components/VendorSignup";
import VendorLogin from "./components/VendorLogin";
import VendorDashboard from "./components/VendorDashboard";
import VendorHome from "./components/VendorHome";
import VLayout from "./components/VLayout";
import AddProduct from "./components/AddProduct";
import ManageProducts from "./components/ManageProducts";
import VendorOrders from "./components/VendorOrders";
import AccountSetting from "./components/AccountSetting";
import Inventory from "./components/Inventory";

import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminVendors from "./components/AdminVendors";
import AdminOrders from "./components/AdminOrder";
import AdminCustomers from "./components/AdminCustomers";
import AdminProducts from "./components/AdminProducts";
import AdminAnalytics from "./components/AdminAnalytics";

import Logout from "./components/Logout";
import Layout from "./components/Layout";

// ✅ NEW
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Layout />
          </PublicRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="vendor/signup" element={<VendorSignup />} />
        <Route path="vendor/login" element={<VendorLogin />} />
      </Route>

      {/* ================= CUSTOMER ================= */}
      <Route path="/customer" element={<CustomerLayout />}>
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="explore" element={<Explore />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="home" element={<Home />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="profile" element={<MyProfile />} />
      </Route>

      {/* ================= VENDOR ================= */}
      <Route path="/vendor" element={<VLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        <Route path="" element={<VendorDashboard />}>
          <Route index element={<VendorHome />} />
          <Route path="dashboard" element={<VendorHome />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="account-settings" element={<AccountSetting />} />
        </Route>
      </Route>

      {/* ================= ADMIN LOGIN ================= */}
      <Route
        path="/admin/login"
        element={
          <PublicRoute>
            <Layout />
          </PublicRoute>
        }
      >
        <Route index element={<AdminLogin />} />
      </Route>

      {/* ================= ADMIN ================= */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="vendors" element={<AdminVendors />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Route>

      {/* ================= LOGOUT ================= */}
      <Route path="/logout" element={<Logout />} />

    </Routes>
  );
}

export default App;