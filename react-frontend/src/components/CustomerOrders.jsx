import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CustomerOrders.css";
import OrderChat from "./OrderChat";

function CustomerOrders() {
  const navigate = useNavigate();

  // ✅ GET USER
  const user = JSON.parse(localStorage.getItem("user"));

  const [orders, setOrders] = useState([]);
  const [flippedCard, setFlippedCard] = useState(null);
  const prevOrdersRef = useRef([]);
  const firstLoadRef = useRef(true);

  useEffect(() => {
    // ✅ PROTECT ROUTE
    if (!user) {
      navigate("/login");
      return;
    }

    const customerId = user.id;

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/vendor/customer/orders/${customerId}`,
          { cache: "no-store" }
        );

        const data = await res.json();
        if (!data.success) return;

        const newOrders = data.orders;
        const prevOrders = prevOrdersRef.current;

        // ✅ SHOW TOAST ONLY AFTER FIRST LOAD
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

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval);

  }, [navigate, user]);

  return (
    <div className="orders-container">

     

      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.order_id} className="order-card">

              <div
                className={`order-card-inner ${
                  flippedCard === order.order_id ? "flipped" : ""
                }`}
              >

                {/* FRONT */}
                <div className="order-front">
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
                  <p><strong>Email:</strong> {order.vendor_email}</p>
                  <p><strong>Address:</strong> {order.vendor_address}</p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.order_date).toLocaleString()}
                  </p>

                  <p><strong>Total:</strong> ₹{order.total_amount}</p>

                  <h4>Products:</h4>

                  <ul className="products-list">
                    {order.items?.map((item) => (
                      <li key={item.product_id}>
                        {item.product_name} x {item.quantity} — ₹
                        {item.price * item.quantity}
                      </li>
                    ))}
                  </ul>

                  {order.order_status === "Confirmed" && (
                    <button
                      className="flip-btn"
                      onClick={() => setFlippedCard(order.order_id)}
                    >
                      Open Chat
                    </button>
                  )}
                </div>

                {/* BACK */}
                <div className="order-back">
                  {order.order_status === "Confirmed" ? (
                    <>
                      <OrderChat
                        order_id={order.order_id}
                        userType="customer"
                        userId={user.id} // ✅ FIXED
                      />

                      <button
                        className="flip-btn"
                        onClick={() => setFlippedCard(null)}
                      >
                        Back to Order
                      </button>
                    </>
                  ) : (
                    <p>Chat available after vendor confirms the order.</p>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}

export default CustomerOrders;