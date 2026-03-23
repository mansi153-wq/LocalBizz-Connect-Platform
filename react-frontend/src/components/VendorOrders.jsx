import { useEffect, useState } from "react";
import "./VendorOrders.css";
// ✅ import the chat component
import OrderChat from "./OrderChat"; 

function VendorOrders() {
  const [orders, setOrders] = useState([]);

  // ✅ DEFINE vendorId HERE
  const vendorId = localStorage.getItem("vendor_id");

  useEffect(() => {
    if (!vendorId) {
      console.log("No vendor ID found");
      return;
    }

    fetch(`http://localhost:5000/vendor/orders/${vendorId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Orders API Response:", data);
        if (data.success) {
          setOrders(data.orders);
        }
      })
      .catch(err => console.error("Fetch orders error:", err));
  }, [vendorId]);


  const updateStatus = (orderId, status) => {
    fetch("http://localhost:5000/vendor/update-order-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        order_id: orderId,
        status: status
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Order updated!");
        
        // refresh orders
        setOrders(prev =>
          prev.map(order =>
            order.order_id === orderId
              ? { ...order, order_status: status }
              : order
          )
        );
      }
    })
    .catch(err => console.error("Update error:", err));
  };

  return (
    
    <div className="vendor-orders-container">
     
    
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions / Chat</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.customer_name}</td>
                <td>₹{order.total_amount}</td>
                <td>{order.order_status}</td>
                <td>{new Date(order.order_date).toLocaleString()}</td>
                <td>
                  {order.order_status === "Pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(order.order_id, "Confirmed")}
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => updateStatus(order.order_id, "Cancelled")}
                        style={{ marginLeft: "10px" }}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {/* ✅ show chat only if order is confirmed */}
                  {order.order_status === "Confirmed" && (
                    <OrderChat
                      order_id={order.order_id}
                      userType="vendor"
                      userId={vendorId}
                    />
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

export default VendorOrders;