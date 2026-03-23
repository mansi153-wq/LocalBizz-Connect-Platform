import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [vendors,setVendors] = useState(0);
  const [customers,setCustomers] = useState(0);
  const [products,setProducts] = useState(0);
  const [orders,setOrders] = useState(0);
useEffect(()=>{

  const id = localStorage.getItem("admin_id");

  if(!id){
    navigate("/admin/login");
    return;
  }

  fetch("http://localhost:5000/admin/dashboard-stats")
  .then(res=>res.json())
  .then(data=>{
    if(data.success){
      setVendors(data.vendors);
      setCustomers(data.customers);
      setProducts(data.products);
      setOrders(data.orders);
    }
  })
  .catch(err=>console.log(err));

},[navigate]);

  const handleLogout = ()=>{
    localStorage.removeItem("admin_id");
    navigate("/admin/login");
  };

  return (

    <div className="admin-dashboard">

      <h2>Admin Dashboard 👨‍💻</h2>

      {/* Stats Section */}



      <div className="admin-stats">

        <div className="admin-cards">
          <h3>{vendors}</h3>
          <p>Total Vendors</p>
        </div>

        <div className="admin-cards">
          <h3>{customers}</h3>
          <p>Total Customers</p>
        </div>

        <div className="admin-cards">
          <h3>{products}</h3>
          <p>Total Products</p>
        </div>

        <div className="admin-cards">
          <h3>{orders}</h3>
          <p>Total Orders</p>
        </div>

      </div>

      <button className="admin-logout" onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default AdminDashboard;