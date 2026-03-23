import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Explore.css";

function Explore() {
  const [products, setProducts] = useState([]);
  const [flippedId, setFlippedId] = useState(null);

  // ✅ Search + Category states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch products from server
  useEffect(() => {
    fetch("http://localhost:5000/vendor/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Unique Categories
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  // ✅ Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle Buy / Inquiry
  const handleBuy = async (product) => {
    const quantity = Number(prompt("Enter quantity:"));

if (!quantity || quantity <= 0) {
  alert("Invalid quantity");
  return;
}

if (quantity > product.stock) {
  alert(`Only ${product.stock} items available`);
  return;
}


const user = JSON.parse(localStorage.getItem("user"));

if (!user || !user.id) {
  alert("Please login first");
  return;
}

const customer_id = user.id;

    const orderData = {
      customer_id: Number(customer_id),
      vendor_id: product.vendor_id,
      items: [
        {
          product_id: product.product_id,
          quantity: Number(quantity),
          price: product.price,
        },
      ],
    };

    try {
      const response = await fetch("http://localhost:5000/vendor/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Order sent successfully!");
      } else {
        alert(result.message || "Error placing order");
      }
    } catch (error) {
      console.error("Server error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="explore-container">
      <h2>Explore Products</h2>
      

      {/* 🔍 Search + Filter Section */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 🛍 Product Grid */}
      <div className="card-grid">
        {filteredProducts.map((product) => (
          <div key={product.product_id} className="flip-card">
            <div className="flip-card-inner">
              {/* FRONT */}
              <div className="flip-card-front">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
              </div>

              {/* BACK */}
              <div className="flip-card-back">
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p className="price">₹{product.price}</p>
                <p>Stock: {product.stock}</p>
                <button onClick={() => handleBuy(product)}>Send Inquiry</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;