import {useEffect,useState} from "react";
import "./AdminProducts.css";

function AdminProducts(){

const [products,setProducts] = useState([]);

useEffect(()=>{

fetch("http://localhost:5000/admin/products")
.then(res=>res.json())
.then(data=>{
 if(data.success){
   setProducts(data.products);
 }
});

},[]);


const changeStatus = (product_id,status)=>{

fetch("http://localhost:5000/admin/update-product-status",{
 method:"PUT",
 headers:{"Content-Type":"application/json"},
 body:JSON.stringify({product_id,status})
})
.then(res=>res.json())
.then(()=>{
 window.location.reload();
});

};


const deleteProduct = (id)=>{

fetch(`http://localhost:5000/admin/delete-product/${id}`,{
 method:"DELETE"
})
.then(res=>res.json())
.then(()=>{
 window.location.reload();
});

};


return(

<div className="admin-products-container">

<h2>Product Management</h2>

<table border="1">

<thead>
<tr>
<th>ID</th>
<th>Product</th>
<th>Vendor</th>
<th>Price</th>
<th>Stock</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{products.map(p=>(

<tr key={p.product_id}>

<td>{p.product_id}</td>
<td>{p.name}</td>
<td>{p.shop_name}</td>
<td>₹{p.price}</td>
<td>{p.stock}</td>
<td>{p.status}</td>

<td>

{p.status === "Active" ? (

<button onClick={()=>changeStatus(p.product_id,"Inactive")}>
Disable
</button>

) : (

<button onClick={()=>changeStatus(p.product_id,"Active")}>
Enable
</button>

)}

<button onClick={()=>deleteProduct(p.product_id)}>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default AdminProducts;