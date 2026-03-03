import { useEffect, useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CustomerOrders.css";

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const customerId = localStorage.getItem("customer_id");
  const prevOrdersRef = useRef([]);
  const firstLoadRef = useRef(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/customer/orders/${customerId}`,
          { cache: "no-store" } // prevent caching
        );

        const data = await res.json();

        if (!data.success) return;

        const newOrders = data.orders;
        const prevOrders = prevOrdersRef.current;

        // Skip toast on first load
        if (!firstLoadRef.current) {
          newOrders.forEach((order) => {
            const oldOrder = prevOrders.find(
              (o) => o.order_id === order.order_id
            );

            if (
              oldOrder &&
              oldOrder.order_status.trim().toLowerCase() !==
                order.order_status.trim().toLowerCase()
            ) {
              toast.success(
                `Order #${order.order_id} updated to ${order.order_status}`
              );
            }
          });
        }

        firstLoadRef.current = false;
        prevOrdersRef.current = newOrders;
        setOrders(newOrders);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchOrders(); // initial
    const interval = setInterval(fetchOrders, 5000); // every 5 sec

    return () => clearInterval(interval);
  }, [customerId]);
return (
  <div className="orders-container">
    <h2 className="orders-title">My Orders</h2>

    {orders.length === 0 ? (
      <p className="no-orders">No orders yet</p>
    ) : (
      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order.order_id} className="order-card">
            <h3>Order #{order.order_id}</h3>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`status ${order.order_status
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
              >
                {order.order_status}
              </span>
            </p>

            <p><strong>Vendor:</strong> {order.vendor_name}</p>
            <p><strong>Phone:</strong> {order.vendor_phone}</p>
            <p><strong>Address:</strong> {order.vendor_address}</p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.order_date).toLocaleString()}
            </p>

            <p><strong>Total:</strong> ₹{order.total_amount}</p>

            <h4>Products:</h4>
            <ul>
              {order.items?.map((item) => (
                <li key={item.product_id}>
                  {item.product_name} x {item.quantity} — ₹
                  {item.price * item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}

    <ToastContainer position="top-right" autoClose={4000} />
  </div>
);
}

export default CustomerOrders;