import { useEffect, useState } from "react";
import "./AdminVendor.css";

function AdminVendors() {

const [vendors, setVendors] = useState([]);

useEffect(() => {

fetch("http://localhost:5000/admin/vendors")
.then(res => res.json())
.then(data => {
 if (data.success) {
   setVendors(data.vendors);
 }
})

}, []);


const changeStatus = (vendor_id, status) => {

fetch("http://localhost:5000/admin/update-vendor-status", {
 method: "PUT",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ vendor_id, status })
})
.then(res => res.json())
.then(data => {
 if (data.success) {
   window.location.reload();
 }
})

}


return (

<div className="admin-vendors-container">

<h2>Vendor Management</h2>

<table className="vendor-table">

<thead>
<tr>
<th>ID</th>
<th>Shop</th>
<th>Owner</th>
<th>Email</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{vendors.map(v => (

<tr key={v.vendor_id}>

<td>{v.vendor_id}</td>
<td>{v.shop_name}</td>
<td>{v.owner_name}</td>
<td>{v.email}</td>

<td>
<span className={v.status === "Active" ? "status-active" : "status-blocked"}>
{v.status}
</span>
</td>

<td>
{v.status === "Active" ? (

<button
className="block-btn"
onClick={() => changeStatus(v.vendor_id, "Inactive")}
>
Block
</button>

) : (

<button
className="activate-btn"
onClick={() => changeStatus(v.vendor_id, "Active")}
>
Activate
</button>

)}

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default AdminVendors;