import { useEffect, useState } from "react";
import "./AdminCustomers.css";
function AdminCustomers(){

const [customers,setCustomers] = useState([]);

useEffect(()=>{

fetch("http://localhost:5000/admin/customers")
.then(res=>res.json())
.then(data=>{
  if(data.success){
    setCustomers(data.customers);
  }
});

},[]);

return(

<div className="admin-customers-container">

<h2>Customer Management</h2>

<table border="1">

<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Mobile</th>
<th>Verified</th>
</tr>
</thead>

<tbody>

{customers.map(c=>(
<tr key={c.id}>

<td>{c.id}</td>
<td>{c.name}</td>
<td>{c.email}</td>
<td>{c.mobile}</td>
<td>{c.is_verified ? "Yes" : "No"}</td>

</tr>
))}

</tbody>

</table>

</div>

)

}

export default AdminCustomers;