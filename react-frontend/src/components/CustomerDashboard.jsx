import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("customer_name");
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const id = localStorage.getItem("customer_id");
    if (!id) {
      navigate("/login");
      return;
    }

    // Fetch featured products
    fetch("http://localhost:5000/vendor/products")
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.products)) setFeaturedProducts(data.products);
      })
      .catch(err => console.error(err));

    // Fetch customer orders
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
}, [navigate]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === "left" ? -250 : 250,
        behavior: "smooth",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("customer_id");
    localStorage.removeItem("customer_name");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Welcome */}
      <div className="welcome-card">
        <h2>Welcome, {name} 👋</h2>
        <p>Explore businesses or check your orders below.</p>
      </div>

      {/* Stats */}
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

      {/* Featured Businesses Carousel */}
      <h3 style={{ marginTop: "40px", color: "#4e73df" }}>Featured Businesses</h3>
      <div className="carousel-wrapper">
        <button className="carousel-btn" onClick={() => scrollCarousel("left")}>◀</button>
        <div className="featured-carousel" ref={carouselRef}>
          {featuredProducts.map(product => (
            <div
              key={product.product_id}
              className="featured-card"
              onClick={() => navigate("/explore")}
            >
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
        <button className="carousel-btn" onClick={() => scrollCarousel("right")}>▶</button>
      </div>

      {/* Action Buttons */}
      <div className="button-group">
        <button onClick={() => navigate("/explore")}>Explore Businesses</button>
        <button onClick={() => navigate("/customer/orders")}>My Orders</button>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default CustomerDashboard;