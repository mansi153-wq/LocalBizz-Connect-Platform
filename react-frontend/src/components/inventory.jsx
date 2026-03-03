import { useEffect, useState } from "react";

function Inventory() {
  const [products, setProducts] = useState([]);
  const vendorId = localStorage.getItem("vendor_id");

  useEffect(() => {
    fetch(`http://localhost:5000/vendor/products/${vendorId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.products);
      })
      .catch(err => console.error("Fetch products error:", err));
  }, [vendorId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventory</h2>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Product</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Price</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.product_id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{p.name}</td>
                <td style={{ padding: "8px" }}>₹{p.price}</td>
                <td style={{ padding: "8px" }}>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Inventory;