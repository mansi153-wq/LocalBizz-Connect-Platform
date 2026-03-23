import { useEffect, useState } from "react";
import "./AdminOrders.css";

function AdminOrders(){

const [orders,setOrders] = useState([]);

useEffect(()=>{

fetch("http://localhost:5000/admin/orders")
.then(res=>res.json())
.then(data=>{
  if(data.success){
    setOrders(data.orders);
  }
});

},[]);

return(

<div className="admin-orders-container">

<h2>All Orders</h2>

<table border="1">

<thead>
<tr>
<th>Order ID</th>
<th>Customer</th>
<th>Vendor</th>
<th>Total</th>
<th>Status</th>
<th>Date</th>
</tr>
</thead>

<tbody>

{orders.map(o=>(
<tr key={o.order_id}>

<td>{o.order_id}</td>
<td>{o.customer_name}</td>
<td>{o.vendor_name}</td>
<td>₹{o.total_amount}</td>
<td>{o.order_status}</td>
<td>{new Date(o.order_date).toLocaleDateString()}</td>

</tr>
))}

</tbody>

</table>

</div>

)

}

export default AdminOrders;