import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const navigate = useNavigate();

  // ✅ GET USER FROM LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name;

  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    // ✅ PROTECT ROUTE
  if (!user) {
  navigate("/login", { replace: true });  // 🔥 IMPORTANT
  return;
}
    const id = user.id;

    // ✅ FETCH FEATURED PRODUCTS
    fetch("http://localhost:5000/vendor/products")
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.products)) {
          setFeaturedProducts(data.products);
        }
      })
      .catch(err => console.error(err));

    // ✅ FETCH CUSTOMER ORDERS
    fetch(`http://localhost:3000/customer/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.orders)) {
          setTotalOrders(data.orders.length);

          const pending = data.orders.filter(
            order => order.order_status.toLowerCase() === "pending"
          ).length;

          setPendingOrders(pending);
        }
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
        setTotalOrders(0);
        setPendingOrders(0);
      });

  }, [navigate, user]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === "left" ? -250 : 250,
        behavior: "smooth",
      });
    }
  };

  // ✅ FIXED LOGOUT
  const handleLogout = () => {
    localStorage.clear();
  navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-container">

      

      {/* ✅ Welcome */}
      <div className="welcome-card">
        <h2>Welcome, {name} 👋</h2>
        <p>Explore businesses or check your orders below.</p>
      </div>

      {/* ✅ Stats */}
      <div className="stats-grid">
        <div className="stat-box">
          <h3>{totalOrders}</h3>
          <p>Total Orders</p>
        </div>
        <div className="stat-box">
          <h3>{pendingOrders}</h3>
          <p>Pending Orders</p>
        </div>
      </div>

      {/* ✅ Featured Businesses */}
      <h3 style={{ marginTop: "40px", color: "#4e73df" }}>
        Featured Businesses
      </h3>

      <div className="carousel-wrapper">
        <button className="carousel-btn" onClick={() => scrollCarousel("left")}>◀</button>

        <div className="featured-carousel" ref={carouselRef}>
          {featuredProducts.map(product => (
            <div
              key={product.product_id}
              className="featured-card"
              onClick={() => navigate("/customer/explore")} // ✅ FIXED ROUTE
            >
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>

        <button className="carousel-btn" onClick={() => scrollCarousel("right")}>▶</button>
      </div>

    </div>
  );
}

export default CustomerDashboard;