import { useEffect, useState } from "react";

function VendorHome() {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const vendor_id = localStorage.getItem("vendor_id") || 1; // ✅ correct vendor ID
        const res = await fetch(`http://localhost:5000/vendor/products/${vendor_id}`);
        const data = await res.json();

        if (data.success && Array.isArray(data.products)) {
          setTotalProducts(data.products.length);
        } else {
          setTotalProducts(0);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setTotalProducts(0);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="header">
        <h1>Welcome, Vendor 👋</h1>
        <p>Here is your dashboard overview</p>
      </div>

      <div className="stats">
        <div className="card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="card">
          <h3>Total Orders</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹0</p>
        </div>
      </div>
    </>
  );
}

export default VendorHome;
