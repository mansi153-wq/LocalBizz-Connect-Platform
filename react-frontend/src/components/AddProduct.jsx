import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const editProduct = location.state?.editProduct;

  // ✅ FIX 1: correct id naming
  const productId = editProduct
    ? editProduct.product_id
    : "PRD-" + Math.floor(100000 + Math.random() * 900000);

  const [formData, setFormData] = useState({
    name: editProduct?.name || "",
    category: editProduct?.category || "",
    price: editProduct?.price || "",
    stock: editProduct?.stock || "",
    description: editProduct?.description || "",
    image: null,
    status: editProduct?.status || "Active",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validation (important)
    if (formData.price <= 0) {
      alert("Price must be greater than 0");
      return;
    }
    if (formData.stock < 0) {
      alert("Stock cannot be negative");
      return;
    }

    // keep old image if editing
    let imageBase64 = editProduct?.image || null;

    // convert new image if selected
    if (formData.image instanceof File) {
      imageBase64 = await convertToBase64(formData.image);
    }

    // ✅ FIX 2: send numbers not strings
    const productData = {
      vendor_id: localStorage.getItem("vendor_id") || 1,
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      description: formData.description,
      image: imageBase64,
      status: formData.status,
    };

    const url = editProduct
      ? `http://localhost:5000/vendor/update-product/${editProduct.product_id}`
      : "http://localhost:5000/vendor/add-product";

    const method = editProduct ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (data.success) {
        alert(editProduct ? "Product Updated Successfully!" : "Product Added Successfully!");
        navigate("/vendor/manage-products");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <h2>{editProduct ? "Edit Product" : "Add New Product"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product ID</label>
            <input type="text" value={productId} disabled />
          </div>

          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />

            {/* ✅ FIX 3: image preview */}
            {(formData.image || editProduct?.image) && (
              <img
                src={
                  formData.image instanceof File
                    ? URL.createObjectURL(formData.image)
                    : editProduct?.image
                }
                alt="preview"
                className="preview-img"
              />
            )}
          </div>

          <button type="submit" className="btn-primary">
            {editProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
