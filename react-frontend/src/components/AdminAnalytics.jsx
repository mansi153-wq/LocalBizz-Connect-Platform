import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./AdminAnalytics.css";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale
);

function AdminAnalytics(){

const [stats,setStats] = useState({
  orders:0,
  customers:0,
  products:0,
  vendors:0
});

useEffect(()=>{

fetch("http://localhost:5000/admin/analytics")
.then(res=>res.json())
.then(data=>{
 if(data.success){
   setStats(data);
 }
});

},[]);


const chartData = {
  labels:["Orders","Customers","Products","Vendors"],
  datasets:[
    {
      label:"Platform Statistics",
      data:[
        stats.orders,
        stats.customers,
        stats.products,
        stats.vendors
      ]
    }
  ]
};

return(

<div className="analytics-container">

<h2 className="analytics-title">Admin Analytics 📊</h2>

<div className="chart-card">
  <Bar data={chartData}/>
</div>

</div>

);

}

export default AdminAnalytics;