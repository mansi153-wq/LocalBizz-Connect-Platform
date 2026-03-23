const express = require("express");
const router = express.Router();
const db = require("./db");

/* ---------------- ADMIN LOGIN ---------------- */

router.post("/login", async (req,res)=>{
  const {email,password} = req.body;

  try{

    const [admin] = await db.execute(
      "SELECT * FROM admin WHERE email=? AND password=?",
      [email,password]
    );

    if(admin.length === 0){
      return res.json({success:false,message:"Invalid credentials"});
    }

    res.json({
      success:true,
      admin_id:admin[0].admin_id,
      admin_name:admin[0].admin_name
    });

  }catch(err){
    console.log(err);
    res.status(500).json({success:false});
  }
});


/* -------- TOTAL VENDORS -------- */

router.get("/total-vendors", async (req,res)=>{
  try{

    const [rows] = await db.execute(
      "SELECT COUNT(*) AS total FROM vendors"
    );

    res.json({
      success:true,
      total: rows[0].total
    });

  }catch(err){
    console.log(err);
    res.status(500).json({success:false});
  }
});

/* -------- DASHBOARD STATS -------- */

router.get("/dashboard-stats", async (req,res)=>{
  try{

    const [vendors] = await db.execute(
      "SELECT COUNT(*) AS total FROM vendors"
    );

    const [customers] = await db.execute(
      "SELECT COUNT(*) AS total FROM customers"
    );

    const [products] = await db.execute(
      "SELECT COUNT(*) AS total FROM products"
    );

    const [orders] = await db.execute(
      "SELECT COUNT(*) AS total FROM orders"
    );

    res.json({
      success:true,
      vendors: vendors[0].total,
      customers: customers[0].total,
      products: products[0].total,
      orders: orders[0].total
    });

  }catch(err){
    console.log(err);
    res.status(500).json({success:false});
  }
});

router.get("/vendors", async (req,res)=>{
  try{

    const [vendors] = await db.execute(
      "SELECT vendor_id, shop_name, owner_name, email, phone, status FROM vendors"
    );

    res.json({
      success:true,
      vendors
    });

  }catch(err){
    console.log(err);
    res.status(500).json({success:false});
  }
});

router.put("/update-vendor-status", async (req,res)=>{
  try{

    const {vendor_id,status} = req.body;

    await db.execute(
      "UPDATE vendors SET status=? WHERE vendor_id=?",
      [status,vendor_id]
    );

    res.json({success:true});

  }catch(err){
    console.log(err);
    res.status(500).json({success:false});
  }
});

/* -------- GET ALL ORDERS -------- */

router.get("/orders", async (req,res)=>{
  try{

    const [orders] = await db.execute(`
      SELECT 
        o.order_id,
        o.total_amount,
        o.order_status,
        o.order_date,
        c.name AS customer_name,
        v.shop_name AS vendor_name
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      JOIN vendors v ON o.vendor_id = v.vendor_id
      ORDER BY o.order_date DESC
    `);

    res.json({
      success:true,
      orders
    });

  }catch(err){
    console.log(err);
    res.status(500).json({success:false});
  }
});


/* -------- GET ALL CUSTOMERS -------- */

router.get("/customers", async (req,res)=>{
  try{

    const [customers] = await db.execute(
      "SELECT id, name, email, mobile, is_verified FROM customers"
    );

    res.json({
      success:true,
      customers
    });

  }catch(err){
    console.log(err);
    res.status(500).json({success:false});
  }
});

router.get("/products", async (req,res)=>{
  try{

    const [products] = await db.execute(`
      SELECT 
        p.product_id,
        p.name,
        p.price,
        p.stock,
        p.status,
        v.shop_name
      FROM products p
      JOIN vendors v ON p.vendor_id = v.vendor_id
      ORDER BY p.product_id DESC
    `);

    res.json({
      success:true,
      products
    });

  }catch(err){
    console.log(err);
    res.status(500).json({success:false});
  }
});

router.put("/update-product-status", async (req,res)=>{
  try{

    const {product_id,status} = req.body;

    await db.execute(
      "UPDATE products SET status=? WHERE product_id=?",
      [status,product_id]
    );

    res.json({success:true});

  }catch(err){
    console.log(err);
    res.status(500).json({success:false});
  }
});

router.delete("/delete-product/:id", async (req,res)=>{
  try{

    const {id} = req.params;

    await db.execute(
      "DELETE FROM products WHERE product_id=?",
      [id]
    );

    res.json({success:true});

  }catch(err){
    console.log(err);
    res.status(500).json({success:false});
  }
});

router.get("/analytics", async (req,res)=>{
  try{

    const [orders] = await db.execute(
      "SELECT COUNT(*) as total FROM orders"
    );

    const [customers] = await db.execute(
      "SELECT COUNT(*) as total FROM customers"
    );

    const [products] = await db.execute(
      "SELECT COUNT(*) as total FROM products"
    );

    const [vendors] = await db.execute(
      "SELECT COUNT(*) as total FROM vendors"
    );

    res.json({
      success:true,
      orders:orders[0].total,
      customers:customers[0].total,
      products:products[0].total,
      vendors:vendors[0].total
    });

  }catch(err){
    console.log(err);
    res.status(500).json({success:false});
  }
});


module.exports = router;