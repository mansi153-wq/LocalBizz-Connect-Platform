import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageProduct.css";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null); // Track which product menu is open
  const navigate = useNavigate();

  // ✅ Use the same vendor_id as AddProduct
  const vendor_id = localStorage.getItem("vendor_id") || 1;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/vendor/products/${vendor_id}`);
        const data = await res.json();

        console.log("Fetched products:", data); // Debug log

        if (data.success) {
          // Convert stock and price to numbers
          const formattedProducts = data.products.map((p) => ({
            ...p,
            stock: Number(p.stock),
            price: Number(p.price),
          }));
          setProducts(formattedProducts);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [vendor_id]);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/vendor/delete-product/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setProducts(products.filter((p) => p.product_id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateStock = async (id) => {
    const newStock = prompt("Enter new stock quantity:");
    if (newStock === null || newStock === "") return;

    try {
      const res = await fetch(`http://localhost:5000/vendor/update-stock/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: Number(newStock) }), // ✅ convert to number
      });
      const data = await res.json();

      if (data.success) {
        setProducts(
          products.map((p) =>
            p.product_id === id ? { ...p, stock: Number(newStock) } : p
          )
        );
      } else {
        alert("Failed to update stock");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editProduct = (product) => {
    navigate("/vendor/add-product", { state: { editProduct: product } });
  };

  return (
    <div className="manage-product-page">
      <h2>Manage Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.product_id}>
                <td>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{p.product_id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>{p.stock > 0 ? "In Stock" : "Out of Stock"}</td>
                <td style={{ position: "relative" }}>
                  <button
                    className="actions-btn"
                    onClick={() =>
                      setActiveMenu(activeMenu === p.product_id ? null : p.product_id)
                    }
                  >
                    Actions ▼
                  </button>

                  {activeMenu === p.product_id && (
                    <div className="dropdown-menu">
                      <button onClick={() => editProduct(p)}>Edit Product</button>
                      <button onClick={() => updateStock(p.product_id)}>Update Stock</button>
                      <button onClick={() => deleteProduct(p.product_id)}>Delete Product</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageProducts;
